import { ActionFunction, LoaderFunction, redirect, useActionData, useLoaderData, useTransition } from "remix"
import * as yup from "yup"
import { validationError, ValidatedForm, withYup } from "remix-validated-form";

import Input from "~/components/form/Input";
import db, { PostType } from "~/utils/db.server";
import SubmitButton from "~/components/form/SubmitButton";

const validator = withYup(
  yup.object({
    slug: yup.string().label("Slug").lowercase("Slugs can only be lowercase").required(),
    plural: yup.string().label("Name plural").required(),
    singular: yup.string().label("Name singular").required(),
    basePath: yup.string().label("Base path"),
  })
);

export const action: ActionFunction = async ({ request }) => {
  const fieldValues = validator.validate(
    Object.fromEntries(await request.formData())
  );
  if (fieldValues.error) return validationError(fieldValues.error);
  const { slug, plural, singular, basePath } = fieldValues.data;

  try {
    await db.postType.update({
      where: {
        slug: slug
      },
      data: {
        slug,
        plural,
        singular,
        basePath
      }
    });
    return redirect("/dashboard/settings/post-types");
  } catch (error: any) {
    return {
      generalError: error.message
    }
  }
};

export let loader: LoaderFunction = async ({ params }) => {
  const slug = params['slug']

  if (!slug) throw new Error("An error occured")

  const postType = await db.postType.findUnique({
    where: {
      slug: slug
    }
  })

  return postType
}


export default function SettingsPostTypesEditRoute() {
  const actionData = useActionData<{ generalError?: string }>();
  const loaderData = useLoaderData<PostType>()

  return (
    <div>
      <h1 className="mb-4">Edit post type: {loaderData.plural}</h1>

      <ValidatedForm defaultValues={{
        slug: loaderData.slug,
        plural: loaderData.plural,
        singular: loaderData.singular,
        basePath: loaderData.basePath !== null ? loaderData.basePath : undefined,
      }} validator={validator} method="post" className="flex flex-col w-full max-w-lg">
        <Input className="mb-4 w-full" type="text" name="slug" label="Slug" required />
        <Input className="mb-4 w-full" type="text" name="plural" label="Name plural" required />
        <Input className="mb-4 w-full" type="text" name="singular" label="Name singular" required />
        <Input className="mb-4 w-full" type="text" name="basePath" label="Base path" />

        {actionData?.generalError && (
          <div className="text-red-600 mb-4">
            {actionData.generalError}
          </div>
        )}

        <div>
          <SubmitButton className="mt-2">
            Save
          </SubmitButton>
        </div>

      </ValidatedForm>
    </div>
  )
}
