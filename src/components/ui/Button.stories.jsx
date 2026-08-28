import { Button } from "./Button";
const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"]
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" }
  }
};
export default meta;
export const Primary = {
  args: {
    variant: "primary",
    children: "Primary Button"
  }
};
export const Secondary = {
  args: {
    variant: "secondary",
    children: "Secondary Button"
  }
};
export const Ghost = {
  args: {
    variant: "ghost",
    children: "Ghost Button"
  }
};
export const Danger = {
  args: {
    variant: "danger",
    children: "Danger Button"
  }
};
export const Loading = {
  args: {
    variant: "primary",
    isLoading: true,
    children: "Loading..."
  }
};
export const Disabled = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Button"
  }
};
