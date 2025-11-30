import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Update the status to 'published' so the page becomes viewable
    const { error } = await supabase
      .from("users_perfectresumescan")
      .update({ status: 'published' })
      .eq('slug', slug);

    if (error) {
      console.error("Publish Error:", error);
      throw new Error("Failed to update status in database");
    }

    return NextResponse.json({ ok: true, slug });

  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
