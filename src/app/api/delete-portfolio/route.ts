import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Soft Delete: Just mark status as 'deleted'
    // Files (resume/JSON) remain in storage
    const { error } = await supabase
      .from("users_perfectresumescan")
      .update({ status: 'deleted' })
      .eq('slug', slug);

    if (error) {
      console.error("Soft Delete Error:", error);
      throw new Error("Failed to mark record as deleted");
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
