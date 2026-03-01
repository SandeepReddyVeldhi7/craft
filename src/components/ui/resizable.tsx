import * as React from "react";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";

import { cn } from "../../lib/utils";

export const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof PanelGroup>) => (
  <PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

export const ResizablePanel = Panel;

export const ResizableHandle = ({
  className,
  ...props
}: React.ComponentProps<typeof PanelResizeHandle>) => (
  <PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:h-4 after:w-1 after:rounded-full after:bg-border",
      className
    )}
    {...props}
  />
);