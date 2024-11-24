"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textArea";
import { Path } from "react-hook-form";


export function TextareaForm<T extends z.ZodObject<any, any>>({
	formSchema,
	onSubmitHandler,
	fieldName, // Add this prop
	formDescription,
	label,     // Add this prop
	placeholder, // Add this prop
}: {
	formSchema: T;
	onSubmitHandler?: (data: z.infer<T>) => void;
	fieldName: Path<z.infer<T>>; // Changed from keyof to Path
	formDescription?: string;
	label?: string;
	placeholder?: string;
}) {
	const form = useForm<z.infer<T>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(data: z.infer<T>) {
		if (onSubmitHandler) {
			onSubmitHandler(data);
			return;
		}

		// Default toast behavior
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name={fieldName} // Use the dynamic fieldName
					render={({ field }) => (
						<FormItem>
							<FormLabel>{label || String(fieldName)}</FormLabel>
							<FormControl>
								<Textarea
									placeholder={placeholder || "Enter text..."}
									className="resize-none"
									{...field}
								/>
							</FormControl>
							{formDescription && (
								<FormDescription>
									{formDescription}
								</FormDescription>

							)}

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
