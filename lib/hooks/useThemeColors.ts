import { useColorScheme } from "nativewind";

/**
 * Hook to get theme-aware colors for use in inline styles and icon props
 * Returns color values based on current theme (light/dark/neon)
 *
 * Use this for:
 * - Icon color props: <Icon color={colors.primary} />
 * - Inline styles: style={{ backgroundColor: colors.card }}
 *
 * For className usage, continue using semantic Tailwind classes:
 * - className="bg-primary text-foreground"
 */
export function useThemeColors() {
  const { colorScheme } = useColorScheme();

  // Support for custom themes beyond light/dark
  const theme = colorScheme as "light" | "dark";

  const colors = {
    light: {
      // Backgrounds
      background: "#f9fafb",
      foreground: "#111827",
      card: "#ffffff",
      cardForeground: "#111827",
      muted: "#f3f4f6",
      mutedForeground: "#6b7280",

      // Borders & Inputs
      border: "#e5e7eb",
      input: "#e5e7eb",

      // Primary
      primary: "#3b82f6",
      primaryForeground: "#ffffff",

      // Secondary
      secondary: "#f3f4f6",
      secondaryForeground: "#111827",

      // Accent
      accent: "#f3f4f6",
      accentForeground: "#111827",

      // Destructive
      destructive: "#ef4444",
      destructiveForeground: "#ffffff",

      // Status colors
      success: "#10b981",
      successForeground: "#ffffff",
      warning: "#f59e0b",
      warningForeground: "#111827",
      info: "#3b82f6",
      infoForeground: "#ffffff",
    },
    dark: {
      // Backgrounds
      background: "#0D0D0D",
      foreground: "#E7EBDA",
      card: "#1f2937",
      cardForeground: "#f9fafb",
      muted: "#374151",
      mutedForeground: "#9ca3af",

      // Borders & Inputs
      border: "#D9D9D9",
      input: "#D9D9D9",

      // Primary
      primary: "#FFFF00",
      primaryForeground: "#595959",

      // Secondary
      secondary: "#374151",
      secondaryForeground: "#f9fafb",

      // Accent
      accent: "#374151",
      accentForeground: "#f9fafb",

      // Destructive
      destructive: "#dc2626",
      destructiveForeground: "#f9fafb",

      // Status colors
      success: "#059669",
      successForeground: "#f9fafb",
      warning: "#ca8a04",
      warningForeground: "#f9fafb",
      info: "#2563eb",
      infoForeground: "#f9fafb",
    },
  };

  // Return colors based on theme

  if (theme === "dark") return colors.dark;
  return colors.light;
}

/* colors: {
        primary: "#FFFF00",
        secondary: "#595959",
        background: {
          primary: "#0D0D0D",
          secondary: "#1A1A1A",
        },
        text: {
          primary: "#E7EBDA",
          secondary: "#D9D9D9",
        },
        status: {
          success: "#28a745",
          warning: "#ffc107",
          error: "#dc3545",
        },
      }, */
