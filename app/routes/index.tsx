import { MetaFunction } from "remix";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Empyrean",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <main>
      <h2 className="text-red-600">Welcome to Empyrean</h2>
    </main>
  );
}
