"use client";

import { Autocomplete } from "@base-ui-components/react/autocomplete";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, Search, X } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";

// Variants
const autocompleteInputVariants = cva(
	"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs shadow-black/5 transition-[color,box-shadow] text-foreground placeholder:text-muted-foreground/80 focus-visible:ring-ring/30 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20",
	{
		variants: {
			variant: {
				default: "",
				outline: "border border-input",
				filled: "bg-muted border-transparent",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const autocompleteTriggerVariants = cva(
	"flex h-10 items-center justify-center px-3 text-sm outline-none focus-visible:ring-ring/30 focus-visible:border-ring focus-visible:ring-[3px]",
	{
		variants: {
			variant: {
				default: "hover:text-accent-foreground",
				ghost: "hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const autocompletePopupVariants = cva(
	"relative z-50 max-h-96 min-w-[8rem] w-[var(--anchor-width)] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[starting-style]:animate-in data-[ending-style]:animate-out data-[starting-style]:fade-in-0 data-[ending-style]:fade-out-0 data-[starting-style]:zoom-in-95 data-[ending-style]:zoom-out-95 ",
);

const autocompleteItemVariants = cva(
	"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
);

const autocompleteEmptyVariants = cva(
	"text-center text-sm text-muted-foreground [&:not(:empty)]:py-2",
);

const autocompleteGroupLabelVariants = cva(
	"px-2 py-1.5 text-sm font-semibold text-foreground",
);

// Context
type AutocompleteContextType = {
	variant?: "default" | "outline" | "filled";
};

const AutocompleteContext = React.createContext<AutocompleteContextType>({
	variant: "default",
});

// Base UI Autocomplete Root
interface AutocompleteRootProps
	extends React.ComponentProps<typeof Autocomplete.Root>,
		VariantProps<typeof autocompleteInputVariants> {}

function AutocompleteRoot(props: AutocompleteRootProps) {
	const { variant = "default", children, ...rest } = props;

	return (
		<AutocompleteContext.Provider value={{ variant: variant || "default" }}>
			<Autocomplete.Root data-slot="autocomplete" {...rest}>
				{children}
			</Autocomplete.Root>
		</AutocompleteContext.Provider>
	);
}

// Base UI Autocomplete Input
function AutocompleteInput(
	props: React.ComponentProps<typeof Autocomplete.Input>,
) {
	const { className, ...rest } = props;
	const { variant } = React.useContext(AutocompleteContext);

	return (
		<Autocomplete.Input
			data-slot="autocomplete-input"
			className={cn(autocompleteInputVariants({ variant }), className)}
			{...rest}
		/>
	);
}

// Base UI Autocomplete Trigger
function AutocompleteTrigger(
	props: React.ComponentProps<typeof Autocomplete.Trigger>,
) {
	const { className, children, ...rest } = props;

	return (
		<Autocomplete.Trigger
			data-slot="autocomplete-trigger"
			className={cn(autocompleteTriggerVariants(), className)}
			{...rest}
		>
			{children || <ChevronDown className="h-4 w-4" />}
		</Autocomplete.Trigger>
	);
}

// Base UI Autocomplete Clear
function AutocompleteClear(
	props: React.ComponentProps<typeof Autocomplete.Clear>,
) {
	const { className, children, ...rest } = props;

	return (
		<Autocomplete.Clear
			data-slot="autocomplete-clear"
			className={cn(
				autocompleteTriggerVariants({ variant: "ghost" }),
				className,
			)}
			{...rest}
		>
			{children || <X className="h-4 w-4" />}
		</Autocomplete.Clear>
	);
}

// Base UI Autocomplete Icon
function AutocompleteIcon(
	props: React.ComponentProps<typeof Autocomplete.Icon>,
) {
	const { className, children, ...rest } = props;

	return (
		<Autocomplete.Icon
			data-slot="autocomplete-icon"
			className={cn("flex items-center justify-center", className)}
			{...rest}
		>
			{children || <Search className="h-4 w-4 text-muted-foreground" />}
		</Autocomplete.Icon>
	);
}

// Base UI Autocomplete Portal
function AutocompletePortal(
	props: React.ComponentProps<typeof Autocomplete.Portal>,
) {
	return <Autocomplete.Portal {...props} />;
}

// Base UI Autocomplete Positioner
function AutocompletePositioner(
	props: React.ComponentProps<typeof Autocomplete.Positioner>,
) {
	const { className, ...rest } = props;

	return (
		<Autocomplete.Positioner
			data-slot="autocomplete-positioner"
			className={cn("outline-none", className)}
			{...rest}
		/>
	);
}

// Base UI Autocomplete Popup
function AutocompletePopup(
	props: React.ComponentProps<typeof Autocomplete.Popup>,
) {
	const { className, children, ...rest } = props;

	return (
		<Autocomplete.Popup
			data-slot="autocomplete-popup"
			className={cn(autocompletePopupVariants(), className)}
			{...rest}
		>
			{children}
		</Autocomplete.Popup>
	);
}

// Base UI Autocomplete List
function AutocompleteList(
	props: React.ComponentProps<typeof Autocomplete.List>,
) {
	const { className, children, ...rest } = props;

	return (
		<Autocomplete.List
			data-slot="autocomplete-list"
			className={cn("max-h-[300px] overflow-y-auto", className)}
			{...rest}
		>
			{children}
		</Autocomplete.List>
	);
}

// Base UI Autocomplete Item
function AutocompleteItem(
	props: React.ComponentProps<typeof Autocomplete.Item>,
) {
	const { className, children, ...rest } = props;

	return (
		<Autocomplete.Item
			data-slot="autocomplete-item"
			className={cn(autocompleteItemVariants(), className)}
			{...rest}
		>
			{children}
		</Autocomplete.Item>
	);
}

// Base UI Autocomplete Empty
function AutocompleteEmpty(
	props: React.ComponentProps<typeof Autocomplete.Empty>,
) {
	const { className, children, ...rest } = props;

	return (
		<Autocomplete.Empty
			data-slot="autocomplete-empty"
			className={cn(autocompleteEmptyVariants(), className)}
			{...rest}
		>
			{children}
		</Autocomplete.Empty>
	);
}

// Base UI Autocomplete Group
function AutocompleteGroup(
	props: React.ComponentProps<typeof Autocomplete.Group>,
) {
	const { className, children, ...rest } = props;

	return (
		<Autocomplete.Group
			data-slot="autocomplete-group"
			className={cn("overflow-hidden p-1", className)}
			{...rest}
		>
			{children}
		</Autocomplete.Group>
	);
}

// Base UI Autocomplete Group Label
function AutocompleteGroupLabel(
	props: React.ComponentProps<typeof Autocomplete.GroupLabel>,
) {
	const { className, children, ...rest } = props;

	return (
		<Autocomplete.GroupLabel
			data-slot="autocomplete-group-label"
			className={cn(autocompleteGroupLabelVariants(), className)}
			{...rest}
		>
			{children}
		</Autocomplete.GroupLabel>
	);
}

// Base UI Autocomplete Separator
function AutocompleteSeparator(
	props: React.ComponentProps<typeof Autocomplete.Separator>,
) {
	const { className, ...rest } = props;

	return (
		<Autocomplete.Separator
			data-slot="autocomplete-separator"
			className={cn("-mx-1 my-1 h-px bg-muted", className)}
			{...rest}
		/>
	);
}

// Base UI Autocomplete Value
function AutocompleteValue(
	props: React.ComponentProps<typeof Autocomplete.Value>,
) {
	return <Autocomplete.Value {...props} />;
}

// Exports with proper naming to match Base UI pattern
export {
	AutocompleteRoot as Autocomplete,
	AutocompleteInput,
	AutocompleteTrigger,
	AutocompleteClear,
	AutocompleteIcon,
	AutocompletePortal,
	AutocompletePositioner,
	AutocompletePopup,
	AutocompleteList,
	AutocompleteItem,
	AutocompleteEmpty,
	AutocompleteGroup,
	AutocompleteGroupLabel,
	AutocompleteSeparator,
	AutocompleteValue,
};
