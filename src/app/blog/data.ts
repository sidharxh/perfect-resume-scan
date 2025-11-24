// src/app/blog/data.ts

export interface LinkedInPostConfig {
    text: string;
    badgeLabel?: string;
    visualQuote: string;
}

export interface AiContent {
    slug: string;          
    title: string;         
    description: string;   
    content: string;       
    keywords: string[];
    linkedinPost?: LinkedInPostConfig;    
}

export interface SeoConfig {
    date: string;          
    updatedAt?: string;    
    author: string;        
    publisherName: string; 
    image: string;         
}

export interface BlogPost extends AiContent, SeoConfig { }

export const blogs: Record<string, BlogPost> = {
    
    'data-engineering-is-ai-engineering': {
        slug: 'data-engineering-is-ai-engineering',
        title: 'The Invisible Bridge: Why Data Engineering is the Hardest Part of AI',
        description: 'A deep dive into the architecture of modern AI systems. We deconstruct why production AI is 90% data pipeline and 10% model inference, and how Data Engineers are uniquely positioned to lead this transition.',
        keywords: ['AI Architecture', 'Data Engineering', 'System Design', 'RAG', 'Vector Search', 'Production Engineering'],
        
        linkedinPost: {
            text: "I'm going to say something controversial: The 'AI Engineer' role is mostly a rebranding of Data Engineering.\n\nWhen we move from a demo in a notebook to a production system, the challenges shift entirely:\n\n1. It's not about 'Prompt Engineering'; it's about context window management (ETL).\n2. It's not about 'Model Training'; it's about real-time retrieval latency (Database Indexing).\n3. It's not about 'Magic'; it's about deterministic guardrails on non-deterministic outputs (Data Quality).\n\nIf you are a Data Engineer feeling left behind, stop. You are the infrastructure. \n\nHere is the technical breakdown of why you are already qualified. #DataEngineering #AI #SystemDesign #TechCareers",
            visualQuote: "AI is not magic. It is a data system with a non-deterministic function at the end.",
            badgeLabel: "Deep Dive 🧠"
        },

        content: `
        <h2>1. The "Model-Centric" Fallacy</h2>
        <p>There is a pervasive myth in our industry that to work in AI, you must be a mathematician. You must understand backpropagation, gradient descent, and transformer architecture at a granular level. This was true in 2018. It is false in 2025.</p>
        
        <p>With the commoditization of Foundation Models (GPT-4, Claude, Llama), the "intelligence" is now an API call. The engineering challenge has shifted from <strong>creating intelligence</strong> to <strong>feeding intelligence</strong>.</p>

        <p><strong>The Reality:</strong> A model is only as good as the context you provide it. Providing that context—reliably, quickly, and securely—is a pure Data Engineering challenge.</p>

        <div class="my-8 p-6 bg-slate-100 border-l-4 border-slate-800 rounded-r-lg">
            <h3 class="text-slate-900 font-bold text-lg mb-2">The New Stack Equation</h3>
            <p class="text-slate-700 font-mono">Success = (Good Data Pipeline) × (Average Model) > (Bad Data Pipeline) × (Perfect Model)</p>
        </div>

        <h2>2. Architecture Breakdown: The "Context Pipeline"</h2>
        <p>Let's analyze the architecture of a Retrieval-Augmented Generation (RAG) system. This is the standard pattern for enterprise AI today. When we strip away the jargon, we see familiar primitives.</p>

        <h3 class="text-xl font-bold mt-8 mb-4">Stage 1: Ingestion (The "E" in ETL)</h3>
        <p><strong>The AI Problem:</strong> We need to ingest 10,000 PDFs, 500,000 Slack messages, and a Jira backlog. This data is messy, unstructured, and constantly changing.</p>
        <p><strong>The DE Solution:</strong> This is standard <strong>Unstructured Data Ingestion</strong>. You need to handle:</p>
        <ul class="list-disc ml-6 my-4 space-y-2">
            <li><strong>Rate Limiting:</strong> Respecting API quotas from source systems.</li>
            <li><strong>Idempotency:</strong> Ensuring that processing the same file twice doesn't create duplicate records.</li>
            <li><strong>CDC (Change Data Capture):</strong> Identifying only the <em>changed</em> documents to avoid reprocessing terabytes of data daily.</li>
        </ul>

        <h3 class="text-xl font-bold mt-8 mb-4">Stage 2: Indexing (The "T" and "L")</h3>
        <p><strong>The AI Problem:</strong> The model needs to find the one relevant paragraph out of 10 million.</p>
        <p><strong>The DE Solution:</strong> This is a <strong>Search Indexing</strong> problem. Instead of B-Trees, we use HNSW (Hierarchical Navigable Small World) graphs. But the engineering principles are identical:</p>
        <div class="overflow-x-auto my-6">
            <table class="w-full border-collapse bg-white text-sm">
                <tr class="bg-slate-900 text-white"><th class="p-3 text-left">Challenge</th><th class="p-3 text-left">Data Engineering Approach</th></tr>
                <tr class="border-b"><td class="p-3 font-semibold">Latency</td><td class="p-3">Optimize index memory usage; Implement caching layers (Redis).</td></tr>
                <tr class="border-b"><td class="p-3 font-semibold">Freshness</td><td class="p-3">Design "Near Real-Time" (NRT) micro-batch updates.</td></tr>
                <tr class="border-b"><td class="p-3 font-semibold">Consistency</td><td class="p-3">Implement atomic transactions for vector upserts.</td></tr>
            </table>
        </div>

        <h3 class="text-xl font-bold mt-8 mb-4">Stage 3: Retrieval (The Query Layer)</h3>
        <p><strong>The AI Problem:</strong> We need to construct a prompt that fits within the context window (e.g., 8,192 tokens).</p>
        <p><strong>The DE Solution:</strong> This is <strong>Query Optimization</strong>. You are "joining" the user's question with your database records.</p>
        <ul class="list-disc ml-6 my-4 space-y-2">
            <li><strong>Metadata Filtering:</strong> <code>WHERE user_id = 123 AND doc_type = 'invoice'</code>. (This is literally SQL).</li>
            <li><strong>Re-ranking:</strong> Sorting the results by relevance score (similar to <code>ORDER BY</code>).</li>
        </ul>

        <h2>3. The "Hidden" Engineering Complexity</h2>
        <p>Junior developers build RAG in a weekend using a simple script. Senior Data Engineers understand why that script will fail in production.</p>

        <h4 class="font-bold text-slate-900 mt-6">Failure Mode A: The "Lost Update"</h4>
        <p><em>Scenario:</em> A user updates a Wiki page. The AI answers a question using the <em>old</em> version of the page 5 minutes later.</p>
        <p><em>The Fix:</em> Event-driven architecture. Using Kafka or AWS EventBridge to trigger immediate re-indexing upon document modification.</p>

        <h4 class="font-bold text-slate-900 mt-6">Failure Mode B: The "Poison Pill"</h4>
        <p><em>Scenario:</em> A single malformed UTF-8 character crashes the entire ingestion pipeline.</p>
        <p><em>The Fix:</em> Dead Letter Queues (DLQ) and robust error handling schemas. (A staple of data engineering).</p>

        <h2>4. Conclusion: Your Call to Action</h2>
        <p>The bridge from Data Engineer to AI Engineer is not built on math. It is built on <strong>System Design</strong>.</p>
        <p>You do not need to go back to school. You need to:</p>
        <ol class="list-decimal ml-8 space-y-2 my-6">
            <li><strong>Learn the new data type:</strong> Understand Vectors and Embeddings.</li>
            <li><strong>Learn the new store:</strong> Master a Vector Database (Pinecone/Weaviate/pgvector).</li>
            <li><strong>Apply your rigor:</strong> Bring your testing, monitoring, and architectural discipline to the chaotic world of AI.</li>
        </ol>

        <div class="mt-12 p-8 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <h3 class="text-2xl font-bold mb-4 text-slate-900">Validate Your Transition</h3>
            <p class="text-slate-600 mb-6">Are you highlighting these system design skills on your resume? Or are you still listing "Hadoop"?</p>
            <a href="/" class="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                Check Your Resume Score Now →
            </a>
        </div>
        `,

        date: '2025-11-24',
        author: 'Sidharth',
        publisherName: 'Perfect Resume Scan',
        image: '/images/blog/invisible-bridge-cover.png',
    },
    
    // BLOG 2: The Tech Stack (Tools)
    '2025-ai-engineer-tech-stack': {
        slug: '2025-ai-engineer-tech-stack',
        title: 'The 2025 AI Engineer Tech Stack: A Shopping List for Data Engineers',
        description: 'Stop learning everything. Focus on these 5 core tools that bridge the gap between Data Engineering and AI. A curated, opinionated stack for 2025.',
        keywords: ['Tech Stack', 'LangChain', 'Pinecone', 'FastAPI', 'LLMOps', 'Career Growth'],
        
        linkedinPost: {
            text: "Tutorial paralysis is killing your transition to AI. 🛑\n\nYou don't need to learn PyTorch, TensorFlow, or CUDA. \n\nIf you are a Data Engineer, here is the specific, narrow stack you need to master in 2025 to get hired:\n\n1. The Framework: LangChain / LangGraph (for orchestration)\n2. The Database: Pinecone or pgvector (for storage)\n3. The API: FastAPI (for serving)\n4. The Obs: Arize Phoenix (for monitoring)\n\nEverything else is noise. Master these 4, and you are production-ready.\n\n#AIEngineer #TechStack #DataEngineering #LearningPath",
            visualQuote: "You don't need PyTorch. You need LangChain, Pinecone, and FastAPI. That is the production stack.",
            badgeLabel: "Curated List 🛠️"
        },

        content: `
        <h2>1. Introduction: Filtering the Noise</h2>
        <p>The AI ecosystem is exploding. Every week there is a new model, a new library, and a new "must-learn" framework. For a Data Engineer looking to pivot, this creates "Tutorial Paralysis."</p>
        
        <p>This guide applies a strict filter: <strong>What tools are actually used in production to build enterprise AI apps?</strong> We are ignoring research tools (PyTorch, JAX) and focusing on <strong>Application Layer</strong> tools.</p>

        <h2>2. The Orchestration Layer: LangChain & LangGraph</h2>
        <p><strong>The DE Equivalent:</strong> Airflow / Prefect</p>
        <p>Just as Airflow manages the dependencies between your data tasks, <strong>LangChain</strong> manages the dependencies between your AI prompts. It handles the "glue" code—formatting prompts, parsing outputs, and managing memory.</p>
        
        <p><strong>Why learn it?</strong> It is the industry standard for building RAG pipelines and Agents. Most job descriptions explicitly ask for it.</p>

        <h2>3. The Storage Layer: Vector Databases</h2>
        <p><strong>The DE Equivalent:</strong> Postgres / Snowflake</p>
        <p>You need a place to store your embeddings. You have two main paths:</p>
        <ul class="list-disc ml-6 my-4 space-y-2">
            <li><strong>Native Vector DBs (Pinecone, Weaviate):</strong> Built from scratch for vectors. Great for massive scale and managed service simplicity.</li>
            <li><strong>Integrated (pgvector):</strong> If you love Postgres, use the <code>pgvector</code> extension. It keeps your relational data and vector data in the same place (ACID compliance!).</li>
        </ul>

        <h2>4. The Serving Layer: FastAPI</h2>
        <p><strong>The DE Equivalent:</strong> Flask / Django (but faster)</p>
        <p>Data Engineers often stop at the database. AI Engineers must expose their models via APIs. <strong>FastAPI</strong> is the Python standard for this because it supports asynchronous calls natively—crucial when waiting for slow LLM responses.</p>

        <div class="bg-slate-900 text-green-400 font-mono text-sm p-6 rounded-lg my-8 overflow-x-auto shadow-xl">
            <p class="text-slate-400 mb-2"># Python: Serving an AI Endpoint</p>
            <p><span class="text-purple-400">from</span> fastapi <span class="text-purple-400">import</span> FastAPI</p>
            <p class="mt-4">app = FastAPI()</p>
            <p class="mt-4"><span class="text-purple-400">@app.post</span>(<span class="text-green-300">"/chat"</span>)</p>
            <p><span class="text-blue-400">async def</span> <span class="text-yellow-300">chat</span>(query: str):</p>
            <p class="ml-4">response = await llm_chain.ainvoke(query)</p>
            <p class="ml-4"><span class="text-purple-400">return</span> {"answer": response}</p>
        </div>

        <h2>5. The "Ops" Layer: LLMOps</h2>
        <p><strong>The DE Equivalent:</strong> Data Dog / Great Expectations</p>
        <p>How do you know if your AI is lying? You can't write a unit test for "truth." You need <strong>LLM Evaluation</strong> tools like <strong>Arize Phoenix</strong> or <strong>LangSmith</strong>. These trace every step of your chain and let you grade the outputs.</p>

        <h2>6. Summary</h2>
        <p>Your learning path for Q1 2025:</p>
        <ol class="list-decimal ml-8 space-y-2 font-bold text-slate-700">
            <li>Build a RAG pipeline with LangChain.</li>
            <li>Store data in Pinecone.</li>
            <li>Wrap it in a FastAPI.</li>
            <li>Trace it with LangSmith.</li>
        </ol>
        `,

        date: '2025-11-25',
        author: 'Sidharth',
        publisherName: 'Perfect Resume Scan',
        image: '/images/blog/tech-stack-cover.png',
    },

    // BLOG 3: The Resume Strategy
    'repackaging-resume-for-ai': {
        slug: 'repackaging-resume-for-ai',
        title: 'The "AI Gap" in Your Resume: How to Repackage Data Engineering Experience',
        description: 'You have the skills, but your resume says "Legacy Tech". Learn how to translate your data engineering bullet points into AI-ready terminology.',
        keywords: ['Resume Tips', 'Career Transition', 'AI Jobs', 'Data Engineering', 'Hiring Trends'],
        
        linkedinPost: {
            text: "Recruiters scan for 'AI' but your resume says 'ETL'. 📄\n\nI see this every day: Senior Data Engineers getting rejected for AI roles they are perfectly qualified for. The problem isn't skills; it's translation.\n\nDon't say: \"Built Python scripts for data cleaning.\"\nDo say: \"Architected unstructured data preprocessing pipeline for NLP model training.\"\n\nSame work. Different framing.\n\nHere is my guide on how to rewrite your DE resume for the AI era. #ResumeTips #CareerChange #AIJobs #Engineering",
            visualQuote: "Don't say 'Built Data Pipeline'. Say 'Architected Data Ingestion Infrastructure for ML Models'.",
            badgeLabel: "Resume Hack 📝"
        },

        content: `
        <h2>1. Introduction: The Translation Problem</h2>
        <p>You are applying for "AI Engineer" roles, but your resume screams "2015 Hadoop Administrator." Recruiters often lack technical depth; they match keywords. If your resume relies on implicit knowledge ("Of course I know vectors, I'm a DE"), you will be filtered out.</p>
        
        <p>You need to perform a <strong>"Resume Refactoring"</strong>—changing the interface (keywords) without changing the implementation (your actual experience).</p>

        <h2>2. The "Find and Replace" Strategy</h2>
        <p>Let's look at common Data Engineering bullets and how to translate them for AI roles.</p>

        <div class="overflow-x-auto my-10 shadow-lg rounded-xl">
            <table class="w-full border-collapse bg-white">
                <thead>
                    <tr class="bg-indigo-900 text-white">
                        <th class="p-4 text-left">Old Bullet (Data Engineer)</th>
                        <th class="p-4 text-left">New Bullet (AI Engineer)</th>
                        <th class="p-4 text-left">Why it works</th>
                    </tr>
                </thead>
                <tbody class="text-sm">
                    <tr class="border-b border-indigo-50">
                        <td class="p-4 text-slate-600">Built Python ETL scripts to clean text data from APIs.</td>
                        <td class="p-4 font-semibold text-indigo-900">Developed unstructured data ingestion pipeline to prepare datasets for <strong>LLM Fine-tuning</strong>.</td>
                        <td class="p-4 text-slate-500">Signals you understand model requirements.</td>
                    </tr>
                    <tr class="border-b border-indigo-50 bg-indigo-50/30">
                        <td class="p-4 text-slate-600">Optimized SQL queries to reduce latency by 50%.</td>
                        <td class="p-4 font-semibold text-indigo-900">Optimized <strong>Retrieval Latency</strong> for high-throughput inference systems.</td>
                        <td class="p-4 text-slate-500">Uses "Inference" and "Retrieval" keywords.</td>
                    </tr>
                    <tr class="border-b border-indigo-50">
                        <td class="p-4 text-slate-600">Managed Postgres database schema migrations.</td>
                        <td class="p-4 font-semibold text-indigo-900">Managed <strong>Vector Store</strong> indexing strategies and metadata filtering.</td>
                        <td class="p-4 text-slate-500">Shows familiarity with vector search concepts.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2>3. Project Strategy: The "Weekend Wrapper"</h2>
        <p>If you don't have professional AI experience yet, use the "Weekend Wrapper" strategy. Take a data project you already built (e.g., a sales dashboard) and wrap an AI feature around it.</p>
        
        <p><strong>Example:</strong> instead of just displaying a SQL table, add a "Chat with your Data" feature using LangChain's SQL Agent. Now, that old project is an "AI Agent" project.</p>

        <h2>4. Conclusion: Validating Your New Profile</h2>
        <p>Once you have rewritten your bullets, you need to test them. Do not guess if they work.</p>
        
        <div class="my-10 p-8 bg-slate-900 text-white rounded-xl shadow-2xl text-center">
            <h3 class="text-2xl font-bold mb-4">🔍 Does Your Resume Pass the AI Scan?</h3>
            <p class="text-lg mb-6 text-slate-300">We built a tool that simulates the ATS algorithms used by top tech companies. Upload your new "AI Engineer" resume and see if it ranks high enough.</p>
            <a href="/" class="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-blue-600/30">Check My Resume Score →</a>
        </div>
        `,

        date: '2025-11-26',
        author: 'Sidharth',
        publisherName: 'Perfect Resume Scan',
        image: '/images/blog/resume-repackaging-cover.png',
    }
};
