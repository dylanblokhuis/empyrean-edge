import { MutableRefObject, useRef } from "react";
import { LoaderFunction, ActionFunction, useLoaderData, LinksFunction, useFetcher, Form } from "remix";
import db, { Post, User } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request, params }) => {
  const id = params.id;
  const post = await db.post.findUnique({
    where: {
      id: id
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  });

  if (!post) throw new Error("This post doesnt exist")

  return post;
};

export let action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  console.log(data.get("content"));

  return true
};


export default function DashboardPostTypesSlugIdRoute() {
  const post = useLoaderData<Post & {
    author: User;
  }>();
  const fetcher = useFetcher();
  const ref = useRef<HTMLFormElement>(null);

  function handleSave() {
    if (!ref) return

    fetcher.submit(ref.current);
  }


  return (
    <div>
      <header className="bg-gray-200 py-2 px-2 flex justify-end">
        <button onClick={handleSave} className="button small">
          Save
        </button>
      </header>
      <fetcher.Form ref={ref} method="post" className="mx-auto max-w-lg mt-10">
        <input name="title" type="text" placeholder="Title" className="mb-3 w-full" />

        <textarea name="content" className="w-full" placeholder="Content"></textarea>
      </fetcher.Form>
    </div>
  )
}
