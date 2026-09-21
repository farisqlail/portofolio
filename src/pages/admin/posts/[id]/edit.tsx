import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AdminLayout from "@/components/admin/AdminLayout";
import PostForm from "@/components/admin/PostForm";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { SAMPLE_POSTS } from "@/lib/blogData";
import type { BlogPost } from "@/types/blog";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    async function loadPost() {
      if (!isSupabaseConfigured) {
        const found = SAMPLE_POSTS.find((p) => p.id === id) || SAMPLE_POSTS[0];
        setPost(found);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          setPost(data as BlogPost);
        } else {
          const found = SAMPLE_POSTS.find((p) => p.id === id);
          setPost(found || null);
        }
      } catch (err) {
        console.error("Error loading post for edit:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout title="LOADING_ARTICLE">
        <div className="p-8 text-center font-mono text-xs text-zinc-500">
          Fetching article from Supabase...
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout title="ARTICLE_NOT_FOUND">
        <div className="p-8 text-center font-mono text-xs text-rose-400">
          Error: Article with ID {id} not found.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`EDIT: ${post.title.substring(0, 24)}...`}>
      <Head>
        <title>Edit Article · Faris Rizqilail CMS</title>
      </Head>
      <PostForm initialData={post} isEdit />
    </AdminLayout>
  );
}
