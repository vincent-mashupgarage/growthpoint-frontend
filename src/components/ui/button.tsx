import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * Button Component Props
 *
 * Extends HTML button attributes with custom variant and size props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   */
  variant?: "default" | "destructive" | "outline" | "ghost";
  /**
   * Size of the button
   */
  size?: "default" | "sm" | "lg" | "icon";
  /**
   * If true, the button will render as a Slot component
   * This allows the button to merge its props with its immediate child
   */
  asChild?: boolean;
}

/**
 * Button Component
 *
 * A flexible button component built with Radix UI's Slot primitive.
 *
 * Why use Radix UI Slot:
 * - Allows composition without wrapper divs
 * - Merges props with child elements
 * - Maintains proper accessibility
 * - Enables using button styles on other elements (e.g., Link)
 *
 * Tailwind CSS Styling:
 * - Uses utility classes for responsive design
 * - Variants for different visual styles
 * - Sizes for different use cases
 * - Focus and hover states for accessibility
 *
 * Example usage:
 * ```tsx
 * <Button>Click me</Button>
 * <Button variant="destructive">Delete</Button>
 * <Button size="sm">Small button</Button>
 * <Button asChild>
 *   <Link href="/about">About</Link>
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", asChild, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Base styles applied to all buttons
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    // Variant styles
    const variants = {
      default:
        "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
      outline:
        "border border-gray-300 bg-white hover:bg-gray-50 focus-visible:ring-gray-400",
      ghost: "hover:bg-gray-100 focus-visible:ring-gray-400",
    };

    // Size styles
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
