import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/blueprints",
      permanent: true, // 308 permanent redirect for SEO
    },
  };
};

export default function TemplatesRedirect() {
  return null;
}
