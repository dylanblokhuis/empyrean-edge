import { ActionFunction, redirect, useActionData } from "remix"
import * as yup from "yup"
import { validationError, ValidatedForm, withYup } from "remix-validated-form";

import Input from "~/components/form/Input";
import db from "~/utils/db.server";

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

  const exists = await db.postType.findUnique({
    where: {
      slug: slug
    }
  })

  if (exists) {
    return { generalError: "A post type already exists with this slug" }
  }

  try {
    await db.postType.create({
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


export default function SettingsPostTypesCreateRoute() {
  const actionData = useActionData<{ generalError?: string }>();

  return (
    <div>
      <h1 className="mb-4">Create post type</h1>

      <ValidatedForm validator={validator} method="post" className="flex flex-col w-full max-w-lg">
        <Input className="mb-4 w-full" type="text" name="slug" label="Slug" required />
        <Input className="mb-4 w-full" type="text" name="plural" label="Name plural" required />
        <Input className="mb-4 w-full" type="text" name="singular" label="Name singular" required />
        <Input className="mb-4 w-full" type="text" name="basePath" label="Base path" />

        {actionData?.generalError && (
          <div className="text-red-600 mb-4">
            {actionData.generalError}
          </div>
        )}

        <button className="button mt-2" type="submit">
          Submit
        </button>
      </ValidatedForm>
    </div>
  )
}
