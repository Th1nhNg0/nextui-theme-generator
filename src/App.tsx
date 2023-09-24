import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  Input,
  ScrollShadow,
} from "@nextui-org/react";
import { useState } from "react";
import { colord } from "colord";

type Color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

const initStyles = {
  "--nextui-background": "0 0% 100%",
  "--nextui-foreground-50": "0 0% 98%",
  "--nextui-foreground-100": "240 5% 96%",
  "--nextui-foreground-200": "240 6% 90%",
  "--nextui-foreground-300": "240 5% 84%",
  "--nextui-foreground-400": "240 5% 65%",
  "--nextui-foreground-500": "240 4% 46%",
  "--nextui-foreground-600": "240 5% 34%",
  "--nextui-foreground-700": "240 5% 26%",
  "--nextui-foreground-800": "240 4% 16%",
  "--nextui-foreground-900": "240 6% 10%",
  "--nextui-foreground": "202 24% 9%",
  "--nextui-divider": "0 0% 7%",
  "--nextui-divider-opacity": "0.15",
  "--nextui-focus": "212 100% 47%",
  "--nextui-overlay": "0 0% 0%",
  "--nextui-content1": "0 0% 100%",
  "--nextui-content1-foreground": "202 24% 9%",
  "--nextui-content2": "240 5% 96%",
  "--nextui-content2-foreground": "240 4% 16%",
  "--nextui-content3": "240 6% 90%",
  "--nextui-content3-foreground": "240 5% 26%",
  "--nextui-content4": "240 5% 84%",
  "--nextui-content4-foreground": "240 5% 34%",
  "--nextui-default-50": "0 0% 98%",
  "--nextui-default-100": "240 5% 96%",
  "--nextui-default-200": "240 6% 90%",
  "--nextui-default-300": "240 5% 84%",
  "--nextui-default-400": "240 5% 65%",
  "--nextui-default-500": "240 4% 46%",
  "--nextui-default-600": "240 5% 34%",
  "--nextui-default-700": "240 5% 26%",
  "--nextui-default-800": "240 4% 16%",
  "--nextui-default-900": "240 6% 10%",
  "--nextui-default-foreground": "0 0% 0%",
  "--nextui-default": "240 5% 84%",
  "--nextui-primary-50": "213 92% 95%",
  "--nextui-primary-100": "212 92% 90%",
  "--nextui-primary-200": "212 92% 79%",
  "--nextui-primary-300": "212 92% 69%",
  "--nextui-primary-400": "212 92% 58%",
  "--nextui-primary-500": "212 100% 47%",
  "--nextui-primary-600": "212 100% 38%",
  "--nextui-primary-700": "212 100% 29%",
  "--nextui-primary-800": "212 100% 19%",
  "--nextui-primary-900": "212 100% 10%",
  "--nextui-primary-foreground": "0 0% 100%",
  "--nextui-primary": "212 100% 47%",
  "--nextui-secondary-50": "270 62% 95%",
  "--nextui-secondary-100": "270 59% 89%",
  "--nextui-secondary-200": "270 59% 79%",
  "--nextui-secondary-300": "270 59% 68%",
  "--nextui-secondary-400": "270 59% 58%",
  "--nextui-secondary-500": "270 67% 47%",
  "--nextui-secondary-600": "270 67% 38%",
  "--nextui-secondary-700": "270 67% 28%",
  "--nextui-secondary-800": "270 67% 19%",
  "--nextui-secondary-900": "270 67% 9%",
  "--nextui-secondary-foreground": "0 0% 100%",
  "--nextui-secondary": "270 67% 47%",
  "--nextui-success-50": "147 64% 95%",
  "--nextui-success-100": "146 61% 89%",
  "--nextui-success-200": "146 62% 77%",
  "--nextui-success-300": "146 63% 66%",
  "--nextui-success-400": "146 62% 55%",
  "--nextui-success-500": "146 79% 44%",
  "--nextui-success-600": "146 80% 35%",
  "--nextui-success-700": "146 79% 26%",
  "--nextui-success-800": "146 80% 17%",
  "--nextui-success-900": "146 78% 9%",
  "--nextui-success-foreground": "0 0% 0%",
  "--nextui-success": "146 79% 44%",
  "--nextui-warning-50": "55 92% 95%",
  "--nextui-warning-100": "37 91% 91%",
  "--nextui-warning-200": "37 91% 82%",
  "--nextui-warning-300": "37 91% 73%",
  "--nextui-warning-400": "37 91% 64%",
  "--nextui-warning-500": "37 91% 55%",
  "--nextui-warning-600": "37 74% 44%",
  "--nextui-warning-700": "37 74% 33%",
  "--nextui-warning-800": "37 75% 22%",
  "--nextui-warning-900": "37 75% 11%",
  "--nextui-warning-foreground": "0 0% 0%",
  "--nextui-warning": "37 91% 55%",
  "--nextui-danger-50": "339 92% 95%",
  "--nextui-danger-100": "340 92% 90%",
  "--nextui-danger-200": "339 90% 80%",
  "--nextui-danger-300": "339 91% 71%",
  "--nextui-danger-400": "339 90% 61%",
  "--nextui-danger-500": "339 90% 51%",
  "--nextui-danger-600": "339 87% 41%",
  "--nextui-danger-700": "339 86% 31%",
  "--nextui-danger-800": "339 87% 20%",
  "--nextui-danger-900": "340 85% 10%",
  "--nextui-danger-foreground": "0 0% 100%",
  "--nextui-danger": "339 90% 51%",
  "--nextui-spacing-unit": "4px",
  "--nextui-spacing-unit-0": "0px",
  "--nextui-spacing-unit-1": "4px",
  "--nextui-spacing-unit-2": "8px",
  "--nextui-spacing-unit-3": "12px",
  "--nextui-spacing-unit-4": "16px",
  "--nextui-spacing-unit-5": "20px",
  "--nextui-spacing-unit-6": "24px",
  "--nextui-spacing-unit-7": "28px",
  "--nextui-spacing-unit-8": "32px",
  "--nextui-spacing-unit-9": "36px",
  "--nextui-spacing-unit-10": "40px",
  "--nextui-spacing-unit-11": "44px",
  "--nextui-spacing-unit-12": "48px",
  "--nextui-spacing-unit-13": "52px",
  "--nextui-spacing-unit-14": "56px",
  "--nextui-spacing-unit-15": "60px",
  "--nextui-spacing-unit-16": "64px",
  "--nextui-spacing-unit-17": "68px",
  "--nextui-spacing-unit-18": "72px",
  "--nextui-spacing-unit-20": "80px",
  "--nextui-spacing-unit-24": "96px",
  "--nextui-spacing-unit-28": "112px",
  "--nextui-spacing-unit-32": "128px",
  "--nextui-spacing-unit-36": "144px",
  "--nextui-spacing-unit-40": "160px",
  "--nextui-spacing-unit-44": "176px",
  "--nextui-spacing-unit-48": "192px",
  "--nextui-spacing-unit-52": "208px",
  "--nextui-spacing-unit-56": "224px",
  "--nextui-spacing-unit-60": "240px",
  "--nextui-spacing-unit-64": "256px",
  "--nextui-spacing-unit-72": "288px",
  "--nextui-spacing-unit-80": "320px",
  "--nextui-spacing-unit-96": "384px",
  "--nextui-spacing-unit-xs": "8px",
  "--nextui-spacing-unit-sm": "12px",
  "--nextui-spacing-unit-md": "16px",
  "--nextui-spacing-unit-lg": "22px",
  "--nextui-spacing-unit-xl": "36px",
  "--nextui-spacing-unit-2xl": "48px",
  "--nextui-spacing-unit-3xl": "80px",
  "--nextui-spacing-unit-4xl": "120px",
  "--nextui-spacing-unit-5xl": "224px",
  "--nextui-spacing-unit-6xl": "288px",
  "--nextui-spacing-unit-7xl": "384px",
  "--nextui-spacing-unit-8xl": "512px",
  "--nextui-spacing-unit-9xl": "640px",
  "--nextui-spacing-unit-3_5": "14px",
  "--nextui-disabled-opacity": "0.5",
  "--nextui-divider-weight": "1px",
  "--nextui-font-size-tiny": "0.75rem",
  "--nextui-font-size-small": "0.875rem",
  "--nextui-font-size-medium": "1rem",
  "--nextui-font-size-large": "1.125rem",
  "--nextui-line-height-tiny": "1rem",
  "--nextui-line-height-small": "1.25rem",
  "--nextui-line-height-medium": "1.5rem",
  "--nextui-line-height-large": "1.75rem",
  "--nextui-radius-small": "8px",
  "--nextui-radius-medium": "12px",
  "--nextui-radius-large": "14px",
  "--nextui-border-width-small": "1px",
  "--nextui-border-width-medium": "2px",
  "--nextui-border-width-large": "3px",
  "--nextui-box-shadow-small":
    "0px 0px 5px 0px rgba(0, 0, 0, 0.02), 0px 2px 10px 0px rgba(0, 0, 0, 0.06), 0px 0px 1px 0px rgba(0, 0, 0, 0.3)",
  "--nextui-box-shadow-medium":
    "0px 0px 15px 0px rgba(0, 0, 0, 0.03), 0px 2px 30px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.3)",
  "--nextui-box-shadow-large":
    "0px 0px 30px 0px rgba(0, 0, 0, 0.04), 0px 30px 60px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.3)",
};
const colors_key = Object.keys(initStyles).filter((key) =>
  isHslColor(initStyles[key as keyof typeof initStyles])
);
const px_key = Object.keys(initStyles).filter((key) =>
  initStyles[key as keyof typeof initStyles].endsWith("px")
);
const rem_key = Object.keys(initStyles).filter((key) =>
  initStyles[key as keyof typeof initStyles].endsWith("rem")
);

function isHslColor(color: string) {
  const regex = /(\d+)\s(\d+)%\s(\d+)%/;
  return regex.test(color);
}

function toHslColor(color: string) {
  // input is like: 0 0% 100% output shuold be: hsl(0, 0%, 100%)
  const regex = /(\d+)\s(\d+)%\s(\d+)%/;
  const match = color.match(regex);
  if (!match) return color;
  const [_, h, s, l] = match;
  _;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export default function App() {
  const colors: Color[] = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];
  const [cssVars, setCssVars] = useState(initStyles);
  function updateColorVar(name: string, value: string) {
    const color = colord(value).toHsl();
    setCssVars((prev) => ({
      ...prev,
      [name]: `${color.h} ${color.s}% ${color.l}%`,
    }));
  }
  function updateVar(name: string, value: string) {
    setCssVars((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="min-h-screen gap-5 bg-gray-800 flex justify-center items-center">
      <Card>
        <CardBody>
          <ScrollShadow className="max-h-96">
            <div className="space-y-2">
              {colors_key.map((key) => (
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colord(
                      toHslColor(cssVars[key as keyof typeof cssVars])
                    ).toHex()}
                    onChange={(e) => updateColorVar(key, e.target.value)}
                  />
                  <span>{key.replace("--nextui-", "").replace("-", " ")}</span>
                </div>
              ))}
              {px_key.map((key) => (
                <div className="flex items-center gap-2">
                  <span className="w-full">
                    {key.replace("--nextui-", "").replace("-", " ")}
                  </span>
                  <Input
                    type="number"
                    value={cssVars[key as keyof typeof cssVars].replace(
                      "px",
                      ""
                    )}
                    onChange={(e) => updateVar(key, e.target.value + "px")}
                    fullWidth={false}
                    endContent="px"
                    step="0.1"
                  />
                </div>
              ))}
              {rem_key.map((key) => (
                <div className="flex items-center gap-2">
                  <span className="w-full">
                    {key.replace("--nextui-", "").replace("-", " ")}
                  </span>
                  <Input
                    type="number"
                    value={cssVars[key as keyof typeof cssVars].replace(
                      "rem",
                      ""
                    )}
                    onChange={(e) => updateVar(key, e.target.value + "rem")}
                    fullWidth={false}
                    endContent="rem"
                    step="0.01"
                  />
                </div>
              ))}
            </div>
          </ScrollShadow>
        </CardBody>
      </Card>
      <div style={cssVars as React.CSSProperties}>
        <Card>
          <CardBody className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <Button
                  size="lg"
                  key={color}
                  color={color}
                  className="uppercase"
                >
                  {color}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <Chip key={color} color={color}>
                  {color}
                </Chip>
              ))}
            </div>
            <div className="flex gap-5 flex-wrap">
              {colors.map((color) => (
                <Badge content="5" color={color}>
                  <Avatar
                    color={color}
                    size="lg"
                    isBordered
                    src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                  />
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <Dropdown key={color}>
                  <DropdownTrigger>
                    <Button variant="bordered" color={color}>
                      Open Menu
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu color={color} aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ))}
            </div>
            <div className="space-y-3">
              {colors.map((color, i) => (
                <Progress
                  key={color}
                  color={color}
                  aria-label="Loading..."
                  value={30 + i * 10}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
