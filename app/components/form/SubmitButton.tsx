import { useIsSubmitting } from "remix-validated-form";
import clsx from "clsx"
import Spinner from "../transitions/Spinner";

interface SubmitButtonProps {
  children: React.ReactNode
  className?: string
}

export default function SubmitButton({ children, className }: SubmitButtonProps) {
  const isSubmitting = useIsSubmitting();

  return (
    <button className={clsx(`button flex items-center`, className)} type="submit">
      {isSubmitting && (
        <Spinner className="mr-3" />
      )}
      {children}
    </button>
  )
}
