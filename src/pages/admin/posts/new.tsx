import Head from "next/head";
import AdminLayout from "@/components/admin/AdminLayout";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <AdminLayout title="NEW_ARTICLE">
      <Head>
        <title>New Article · Faris Rizqilail CMS</title>
      </Head>
      <PostForm />
    </AdminLayout>
  );
}
