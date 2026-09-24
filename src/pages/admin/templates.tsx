import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/admin/blueprints",
      permanent: true,
    },
  };
};

export default function AdminTemplatesRedirect() {
  return null;
}
