// "use client";
// import FilterJurisdictionDialog from "@/components/filterJurisdictionDialog";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "@/components/ui/table";
// import { createClient } from "@/lib/utils/supabase/client";
// import {
// 	ChevronLeftIcon,
// 	ChevronRightIcon,
// 	DoubleArrowLeftIcon,
// 	DoubleArrowRightIcon,
// } from "@radix-ui/react-icons";
// import {
// 	Column,
// 	ColumnDef,
// 	ColumnFiltersState,
// 	ColumnResizeDirection,
// 	RowData,
// 	SortingState,
// 	Table as TableT,
// 	VisibilityState,
// 	flexRender,
// 	getCoreRowModel,
// 	useReactTable
// } from "@tanstack/react-table";
// import * as React from "react";
// import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";
// import {
// 	DropdownMenu,
// 	DropdownMenuCheckboxItem,
// 	DropdownMenuContent,
// 	DropdownMenuLabel,
// 	DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";

// // import { SuggestEditSheet } from "@/app/(postAuth)/citations/data/page";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { AdjustmentsVerticalIcon, BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/24/outline";
// import { TableProperties } from "lucide-react";

// interface EditableField {
// 	value: string;
// 	label: string;
// }

// interface FilterCondition {
// 	id: string;
// 	column: string;
// 	operator: string;
// 	value: string;
// 	isActive?: boolean;
// }


// const FILTER_OPERATORS = {
// 	text: [
// 		{ id: 'equals', label: 'Equals Exactly' },
// 		{ id: 'not_equals', label: 'Does Not Equal' },
// 		{ id: 'contains', label: 'Contains' },
// 		{ id: 'not_contains', label: 'Does Not Contain' },
// 		{ id: 'in_list', label: 'Is In List' },
// 		{ id: 'not_in_list', label: 'Is Not In List' }
// 	],
// 	number: [
// 		{ id: 'equals', label: 'Equals' },
// 		{ id: 'not_equals', label: 'Does Not Equal' },
// 		{ id: 'greater_than', label: 'Greater Than' },
// 		{ id: 'less_than', label: 'Less Than' },
// 		{ id: 'greater_than_or_equal', label: 'Greater Than or Equal' },
// 		{ id: 'less_than_or_equal', label: 'Less Than or Equal' },
// 		{ id: 'between', label: 'Between' },
// 		{ id: 'not_between', label: 'Not Between' }
// 	],
// 	boolean: [
// 		{ id: 'is_true', label: 'Is True' },
// 		{ id: 'is_false', label: 'Is False' }
// 	]
// };


// const filterableColumns = [
// 	{ id: "category", label: "Category", columnType: "text" }, // Mostly equals
// 	{ id: "subcategory", label: "Subcategory", columnType: "text" }, // Mostly equals
// 	{ id: "record_type", label: "Record Type", columnType: "text" }, // Mostly equals
// 	{ id: "who", label: "Who", columnType: "text" }, // Most used filter, uses almost all text operators
// 	{ id: "what_to_store", label: "What to Store", columnType: "text" }, // Most likely used with "contains"
// 	{ id: "legal_reference", label: "Legal Reference", columnType: "text" }, // Mostly contains
// 	{ id: "category_id", label: "Category ID", columnType: "text" },
// 	{ id: "subcategory_id", label: "Subcategory ID", columnType: "text" },
// 	{ id: "record_type_id", label: "Record Type ID", columnType: "text" },
// 	{ id: "jurisdiction_id", label: "Jurisdiction ID", columnType: "text" },
// 	{ id: "fk_id", label: "FK ID", columnType: "text" },
// 	{ id: "calculated_period", label: "Calculated Period", columnType: "number" }, // Time Standardized to years. Uses number operators
// 	{ id: "retention", label: "Period", columnType: "number" }, // Not standardized time

// ];
// export interface DataTableSettings {
// 	startingPageIndex?: number;
// 	pageSize?: number;
// 	totalRows?: number;
// 	visibilityState: VisibilityState;
// 	onPaginationChange?: (pageIndex: number, pageSize: number) => void;
// 	onSortingChange?: (sorting: SortingState) => void;
// 	onFilterChange?: (filters: ColumnFiltersState) => void;
// 	editableFields?: EditableField[];
// }
// interface DataTableProps<TData, TValue> {
// 	columns: ColumnDef<TData, TValue>[];
// 	title: string;
// 	description: string;



// }

// declare module '@tanstack/react-table' {
// 	//allows us to define custom properties for our columns
// 	interface ColumnMeta<TData extends RowData, TValue> {
// 		filterVariant?: 'text' | 'range' | 'select';
// 		name: string;
// 		allowEdit?: boolean;
// 	}
// }
// type ColumnDefWithAccessor<TData> = ColumnDef<TData, unknown> & {
// 	accessorKey?: string;
// };
// const supabase = createClient();

// export function DataTable<TData, TValue>({
// 	columns,
// 	data,
// 	setData,
// 	title,
// 	description,
// 	settings,

// }: DataTableProps<TData, TValue>) {
// 	const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>([]);


// 	// Keep track of current table state
// 	const [currentState, setCurrentState] = useState({
// 		pageIndex: 0,
// 		pageSize: 100,
// 		sorting: [] as SortingState,
// 		filters: [] as ColumnFiltersState
// 	});



// 	// Modified functions




// 	const tableSettings = {
// 		visibilityState: {
// 			"id": false,
// 			"fk_id": false,
// 			"jurisdiction": true,
// 			"filerskeepers_id": false,
// 			"who": true,
// 			"what": true,
// 			"minimum_maximum": false,
// 			"retention": false,
// 			"period": false,
// 			"calculated_period": false,
// 			"from_date": false,
// 			"legal_reference": true,
// 			"legal_link": true,
// 			"category": true,
// 			"category_id": false,
// 			"subcategory": true,
// 			"subcategory_id": false,
// 			"record_type": true,
// 			"record_type_id": false,
// 		},
// 		pageSize: currentState.pageSize,
// 		startingPageIndex: 0,
// 		totalRows: totalCount,
// 		// Add handlers for table state changes
// 		onPaginationChange: (pageIndex: number, pageSize: number) => {
// 			setCurrentState(prev => ({
// 				...prev,
// 				pageIndex,
// 				pageSize
// 			}));
// 		},
// 		onSortingChange: (sorting: SortingState) => {
// 			setCurrentState(prev => ({
// 				...prev,
// 				sorting,
// 				pageIndex: 0 // Reset to first page when sorting changes
// 			}));
// 		},
// 		onFilterChange: (filters: ColumnFiltersState) => {
// 			setCurrentState(prev => ({
// 				...prev,
// 				filters,
// 				pageIndex: 0 // Reset to first page when filters change
// 			}));
// 		}

// 	};
// 	const [sorting, setSorting] = React.useState<SortingState>([]);
// 	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
// 		[]
// 	);
// 	const [rowSelection, setRowSelection] = React.useState({});

// 	const [columnResizeDirection, setColumnResizeDirection] =
// 		React.useState<ColumnResizeDirection>('ltr');

// 	const [columnVisibility, setColumnVisibility] =
// 		React.useState<VisibilityState>(settings.visibilityState);
// 	const [pagination, setPagination] = React.useState({
// 		pageIndex: settings?.startingPageIndex || 0, //initial page index
// 		pageSize: settings?.pageSize || 100, //default page size
// 	});

// 	const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([]);
// 	const [totalCount, setTotalCount] = useState(0);
// 	const [loading, setLoading] = useState(true);

// 	const fetchPageData = async () => {
// 		setLoading(true);

// 		try {
// 			let query = supabase
// 				.from('citations')
// 				.select('*', { count: 'exact' });

// 			filterConditions
// 				.filter(condition => condition.isActive)
// 				.forEach(condition => {
// 					const columnType = filterableColumns.find(col => col.id === condition.column)?.columnType;

// 					if (columnType === 'text') {
// 						switch (condition.operator) {
// 							case 'contains':
// 								query = query.ilike(condition.column, `%${condition.value}%`);
// 								break;
// 							case 'not_contains':
// 								query = query.not(condition.column, 'ilike', `%${condition.value}%`);
// 								break;
// 							case 'in_list':
// 								const values = condition.value.split(',').map(v => v.trim());
// 								query = query.in(condition.column, values);
// 								break;
// 							case 'not_in_list':
// 								const notValues = condition.value.split(',').map(v => v.trim());
// 								query = query.not(condition.column, 'in', notValues);
// 								break;
// 							case 'equals':
// 								query = query.eq(condition.column, condition.value);
// 								break;
// 							case 'not_equals':
// 								query = query.neq(condition.column, condition.value);
// 								break;
// 						}
// 					} else if (columnType === 'number') {
// 						const numValue = parseFloat(condition.value);
// 						switch (condition.operator) {
// 							case 'equals':
// 								query = query.eq(condition.column, numValue);
// 								break;
// 							case 'not_equals':
// 								query = query.neq(condition.column, numValue);
// 								break;
// 							case 'greater_than':
// 								query = query.gt(condition.column, numValue);
// 								break;
// 							case 'less_than':
// 								query = query.lt(condition.column, numValue);
// 								break;
// 							case 'greater_than_or_equal':
// 								query = query.gte(condition.column, numValue);
// 								break;
// 							case 'less_than_or_equal':
// 								query = query.lte(condition.column, numValue);
// 								break;
// 							case 'between':
// 								const [min, max] = condition.value.split(',').map(v => parseFloat(v.trim()));
// 								query = query.gte(condition.column, min).lte(condition.column, max);
// 								break;
// 							case 'not_between':
// 								const [notMin, notMax] = condition.value.split(',').map(v => parseFloat(v.trim()));
// 								query = query.or(`${condition.column}.lt.${notMin},${condition.column}.gt.${notMax}`);
// 								break;
// 						}
// 					}
// 				});

// 			// Apply jurisdiction filters if any
// 			if (selectedJurisdictions.length > 0) {
// 				query = query.in('jurisdiction_id', selectedJurisdictions);
// 			}

// 			// Apply sorting
// 			if (currentState.sorting.length > 0) {
// 				const { id, desc } = currentState.sorting[0];
// 				query = query.order(id, {
// 					ascending: !desc,
// 					nullsFirst: false
// 				});
// 			}

// 			// Apply pagination
// 			const start = currentState.pageIndex * currentState.pageSize;
// 			const end = start + currentState.pageSize - 1;

// 			const { data, error, count } = await query
// 				.range(start, end);

// 			if (error) throw error;

// 			setData(data);
// 			setTotalCount(count || 0);
// 		} catch (error) {
// 			console.error('Error fetching citations:', error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};


// 	// Fetch data when table state changes
// 	useEffect(() => {
// 		fetchPageData();
// 	}, [currentState]);

// 	useEffect(() => {
// 		const fetchJurisdictions = async () => {
// 			const { data, error } = await supabase
// 				.from('jurisdictions')
// 				.select('*');
// 			if (error) throw error;
// 			setJurisdictions(data);
// 		};
// 		fetchJurisdictions();

// 	}, []);


// 	const removeFilterCondition = (id: string) => {
// 		setFilterConditions(filterConditions.filter((condition) => condition.id !== id));
// 		// Only update table filters for active conditions
// 		const updatedFilters = filterConditions
// 			.filter((condition) => condition.id !== id && condition.isActive)
// 			.map(buildFilterObject);
// 		updateTableFilters(updatedFilters);
// 	};

// 	const applyFilterCondition = (id: string) => {
// 		// Update the specific condition to be active
// 		const updatedConditions = filterConditions.map((condition) =>
// 			condition.id === id
// 				? {
// 					...condition,
// 					isActive: true
// 				}
// 				: condition
// 		);
// 		setFilterConditions(updatedConditions);

// 		// Get all active filter conditions and apply them
// 		const tableFilters = updatedConditions
// 			.filter((condition) => condition.isActive && condition.column && condition.value)
// 			.map(buildFilterObject);

// 		updateTableFilters(tableFilters);
// 	};



// 	const updateFilterCondition = (
// 		id: string,
// 		updates: Partial<FilterCondition>
// 	) => {
// 		const updatedConditions = filterConditions.map((condition) =>
// 			condition.id === id
// 				? {
// 					...condition,
// 					...updates,
// 					isActive: false
// 				}
// 				: condition
// 		);
// 		console.log(`Updated conditions: ${JSON.stringify(updatedConditions, null, 2)}`);
// 		setFilterConditions(updatedConditions);


// 	};

// 	const updateTableFilters = (filters: any[]) => {
// 		setCurrentState(prev => ({
// 			...prev,
// 			filters,
// 			pageIndex: 0
// 		}));
// 	};

// 	const addFilterCondition = () => {
// 		const newCondition: FilterCondition = {
// 			id: Math.random().toString(36).substr(2, 9),
// 			column: "",
// 			operator: "equals",
// 			value: "",
// 		};
// 		setFilterConditions([...filterConditions, newCondition]);
// 	};

// 	const buildFilterObject = (condition: FilterCondition) => {
// 		const columnType = filterableColumns.find(col => col.id === condition.column)?.columnType;

// 		switch (condition.operator) {
// 			case 'contains':
// 				return {
// 					id: condition.column,
// 					value: `ilike.%${condition.value}%`
// 				};
// 			case 'not_contains':
// 				return {
// 					id: condition.column,
// 					value: `not.ilike.%${condition.value}%`
// 				};
// 			case 'in_list':
// 				const values = condition.value.split(',').map(v => v.trim());
// 				return {
// 					id: condition.column,
// 					value: values
// 				};
// 			case 'not_in_list':
// 				const notValues = condition.value.split(',').map(v => v.trim());
// 				return {
// 					id: condition.column,
// 					value: `not.in.(${notValues.join(',')})`
// 				};
// 			case 'greater_than':
// 				return {
// 					id: condition.column,
// 					value: `gt.${condition.value}`
// 				};
// 			case 'less_than':
// 				return {
// 					id: condition.column,
// 					value: `lt.${condition.value}`
// 				};
// 			case 'greater_than_or_equal':
// 				return {
// 					id: condition.column,
// 					value: `gte.${condition.value}`
// 				};
// 			case 'less_than_or_equal':
// 				return {
// 					id: condition.column,
// 					value: `lte.${condition.value}`
// 				};
// 			case 'between':
// 				const [min, max] = condition.value.split(',');
// 				return {
// 					id: condition.column,
// 					value: `and(gte.${min},lte.${max})`
// 				};
// 			case 'not_between':
// 				const [notMin, notMax] = condition.value.split(',');
// 				return {
// 					id: condition.column,
// 					value: `or(lt.${notMin},gt.${notMax})`
// 				};
// 			case 'equals':
// 				return {
// 					id: condition.column,
// 					value: condition.value
// 				};
// 			case 'not_equals':
// 				return {
// 					id: condition.column,
// 					value: `neq.${condition.value}`
// 				};
// 			case 'is_true':
// 				return {
// 					id: condition.column,
// 					value: true
// 				};
// 			case 'is_false':
// 				return {
// 					id: condition.column,
// 					value: false
// 				};
// 			default:
// 				return {
// 					id: condition.column,
// 					value: condition.value
// 				};
// 		}
// 	};

// 	const table = useReactTable({
// 		data,
// 		columns,
// 		// Column configuration
// 		columnResizeMode: 'onChange',
// 		columnResizeDirection,
// 		defaultColumn: {
// 			minSize: 50,
// 			maxSize: 800
// 		},

// 		// Manual server-side operations
// 		manualPagination: true,
// 		manualSorting: true,
// 		manualFiltering: true,

// 		// Event handlers
// 		onSortingChange: (updater) => {
// 			const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
// 			setSorting(newSorting);
// 			settings.onSortingChange?.(newSorting);
// 		},
// 		onColumnFiltersChange: (updater) => {
// 			const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
// 			setColumnFilters(newFilters);
// 			settings.onFilterChange?.(newFilters);
// 		},
// 		onPaginationChange: (updater) => {
// 			const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
// 			setPagination(newPagination);
// 			settings.onPaginationChange?.(newPagination.pageIndex, newPagination.pageSize);
// 		},
// 		onColumnVisibilityChange: setColumnVisibility,
// 		onRowSelectionChange: setRowSelection,

// 		// Feature models
// 		getCoreRowModel: getCoreRowModel(),
// 		pageCount: Math.ceil((settings.totalRows ?? 0) / pagination.pageSize),
// 		enableRowPinning: true,


// 		// Table state
// 		state: {
// 			sorting,
// 			columnFilters,
// 			columnVisibility,
// 			rowSelection,
// 			pagination,
// 			rowPinning: {
// 				top: ['header-row']
// 			},
// 		},
// 	});

// 	// Don't touch
// 	const columnSizeVars = React.useMemo(() => {
// 		const headers = table.getFlatHeaders();
// 		const colSizes: { [key: string]: number; } = {};
// 		for (let i = 0; i < headers.length; i++) {
// 			const header = headers[i]!;
// 			let headerSize = header.getSize();
// 			let headerColSize = header.column.getSize();
// 			// Max Size!
// 			if (headerSize < 50) {
// 				console.log("headerSize below minimum!");
// 				headerSize = 50;
// 			}
// 			if (headerColSize < 50) {
// 				console.log("headerColSize below minimum!");
// 				headerColSize = 50;
// 			}
// 			// Min size!
// 			if (headerSize > 800) {
// 				console.log("headerSize above maximum!");
// 				headerSize = 800;
// 			}
// 			if (headerColSize > 800) {
// 				console.log("headerColSize above maximum!");
// 				headerColSize = 800;
// 			}
// 			colSizes[`--header-${header.id}-size`] = headerSize;
// 			colSizes[`--col-${header.column.id}-size`] = headerColSize;
// 		}
// 		return colSizes;
// 	}, [table.getState().columnSizingInfo, table.getState().columnSizing]);


// 	// Rest remains unchanged
// 	return (
// 		<Card className="h-full w-full flex flex-col">
// 			<CardHeader className="bg-gray-50 border-b">
// 				<div className="flex justify-between items-center">
// 					<CardTitle className="text-lg font-bold text-gray-800">
// 						{title}
// 					</CardTitle>
// 					<div className="overflow-auto">
// 						<FilterJurisdictionDialog

// 							selectedJurisdictions={selectedJurisdictions}
// 							setSelectedJurisdictions={setSelectedJurisdictions}
// 							currentState={currentState}
// 							setCurrentState={setCurrentState}
// 						/>
// 						<DropdownMenu>
// 							<DropdownMenuTrigger asChild>
// 								<Button variant="outline" className="mr-2 border-gray-300 hover:bg-gray-100">
// 									<TableProperties className="h-4 w-4 mr-2" />
// 									Toggle Columns
// 								</Button>
// 							</DropdownMenuTrigger>
// 							<DropdownMenuContent align="end" className="shadow-xl">
// 								{table.getAllColumns()
// 									.filter(column => column.getCanHide())
// 									.map((column) => (
// 										<DropdownMenuCheckboxItem
// 											key={column.id}
// 											className="capitalize"
// 											checked={column.getIsVisible()}
// 											onCheckedChange={(value) => column.toggleVisibility(!!value)}
// 										>
// 											{column.id}
// 										</DropdownMenuCheckboxItem>
// 									))}
// 							</DropdownMenuContent>
// 						</DropdownMenu>
// 					</div>
// 				</div>
// 				<CardDescription className="text-gray-500">
// 					{description}
// 				</CardDescription>
// 			</CardHeader>
// 			<CardContent className="flex-1 min-h-0 p-0">
// 				<div className="h-full flex flex-col border border-gray-200">
// 					<div className="flex-1 overflow-auto">
// 						<Table
// 							style={{
// 								...columnSizeVars,
// 								width: table.getTotalSize(),
// 							}}
// 							className="border-collapse"
// 						>
// 							<TableHeader>
// 								{table.getHeaderGroups().map((headerGroup) => (
// 									<TableRow key={headerGroup.id} data-state="pinned" className="sticky top-0 z-10 bg-gray-100 hover:bg-gray-100">
// 										{headerGroup.headers.map((header) => {
// 											const isResizing = header.column.getIsResizing();
// 											return (
// 												<TableHead
// 													key={header.id}
// 													colSpan={header.colSpan}
// 													className="relative border border-gray-300 bg-gray-100 p-2 text-sm font-semibold text-gray-900 select-none"

// 													style={{
// 														width: `calc(var(--header-${header?.id}-size) * 1px)`,

// 													}}
// 												>
// 													<div className="flex items-center justify-between h-full">
// 														<Sorter column={header.column} />
// 													</div>
// 													{header.column.getCanResize() && (
// 														<div
// 															{...{
// 																onDoubleClick: () => header.column.resetSize(),
// 																onMouseDown: header.getResizeHandler(),
// 																onTouchStart: header.getResizeHandler(),
// 																className: `resizer ${isResizing
// 																	? 'isResizing bg-blue-500 opacity-100'
// 																	: 'bg-gray-300 opacity-0 hover:opacity-100'
// 																	} absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none transition-opacity`,
// 															}}
// 														/>
// 													)}
// 												</TableHead>
// 											);
// 										})}
// 									</TableRow>
// 								))}
// 							</TableHeader>
// 							<SeparateTableBody loading={loading} table={table} />
// 						</Table>
// 					</div>
// 				</div>


// 			</CardContent>
// 			<CardFooter className="border-t bg-gray-50 px-4 py-3">
// 				<div className="flex items-center justify-between w-full text-sm text-gray-700">
// 					<div className="flex items-center gap-4">
// 						<span>
// 							Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
// 						</span>
// 						<span className="border-l pl-4">
// 							Showing {settings?.pageSize || 100} Rows Per Page
// 						</span>
// 					</div>
// 					<div className="flex items-center gap-2">
// 						<Button
// 							variant="outline"
// 							className="hidden h-8 w-8 p-0 lg:flex"
// 							onClick={() => table.setPageIndex(0)}
// 							disabled={!table.getCanPreviousPage()}
// 						>
// 							<span className="sr-only">Go to first page</span>
// 							<DoubleArrowLeftIcon className="h-4 w-4" />
// 						</Button>
// 						<Button
// 							variant="outline"
// 							className="h-8 w-8 p-0"
// 							onClick={() => table.previousPage()}
// 							disabled={!table.getCanPreviousPage()}
// 						>
// 							<span className="sr-only">Go to previous page</span>
// 							<ChevronLeftIcon className="h-4 w-4" />
// 						</Button>
// 						<Button
// 							variant="outline"
// 							className="h-8 w-8 p-0"
// 							onClick={() => table.nextPage()}
// 							disabled={!table.getCanNextPage()}
// 						>
// 							<span className="sr-only">Go to next page</span>
// 							<ChevronRightIcon className="h-4 w-4" />
// 						</Button>
// 						<Button
// 							variant="outline"
// 							className="hidden h-8 w-8 p-0 lg:flex"
// 							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
// 							disabled={!table.getCanNextPage()}
// 						>
// 							<span className="sr-only">Go to last page</span>
// 							<DoubleArrowRightIcon className="h-4 w-4" />
// 						</Button>
// 					</div>
// 				</div>
// 			</CardFooter>

// 		</Card >

// 	);
// }




// export const MemoizedTableBody = React.memo(SeparateTableBody, (prevProps, nextProps) => {
// 	return prevProps.table.options.data === nextProps.table.options.data;
// }) as typeof SeparateTableBody;

// interface TableBodyProps<TData> {
// 	table: TableT<TData>;
// 	loading: boolean;


// }

// function SeparateTableBody<TData>({ table, loading }: TableBodyProps<TData>) {
// 	//console.log(JSON.stringify(table.getRowModel().rows[0], null, 2))
// 	// if (loading) {
// 	// Get current page size from table


// 	const pageSize = table.getState().pagination.pageSize;
// 	if (loading) {
// 		return (
// 			<TableBody>
// 				{Array.from({ length: pageSize }).map((_, rowIndex) => (
// 					<TableRow key={rowIndex}>
// 						<TableCell colSpan={table.getAllColumns().length}>
// 							<div className="flex items-center gap-4">
// 								<Skeleton className="h-8 w-8 rounded-full" />
// 								<div className="space-y-2 flex-1">
// 									<Skeleton className="h-4 w-2/3" />
// 									<Skeleton className="h-4 w-1/3" />
// 								</div>
// 							</div>
// 						</TableCell>
// 					</TableRow>
// 				))}
// 			</TableBody>
// 		);
// 	}
// 	//}
// 	//console.log(JSON.stringify(table.getRowModel().rows[0].getVisibleCells(), null, 2));
// 	return (
// 		<TableBody>
// 			{table.getRowModel().rows?.length ? (
// 				table.getRowModel().rows.map((row) => (

// 					<TableRow
// 						key={row.id}
// 						data-state={row.getIsSelected() && "selected"}
// 						className="hover:bg-gray-50 transition-colors"
// 					>
// 						{row.getVisibleCells().map((cell) => {
// 							const isEditable = cell.column.columnDef.meta?.allowEdit;

// 							const fieldName = (cell.column.columnDef as ColumnDefWithAccessor<TData>).accessorKey;
// 							//console.log(`Column ${fieldName} is editable: ${isEditable}`);

// 							return (

// 								<TableCell
// 									key={cell.id}
// 									style={{
// 										width: cell.column.getSize(),
// 									}}
// 									className="p-0 relative group border border-gray-200 text-sm" // Add relative positioning and group class here
// 								>
// 									<div className="h-full w-full p-2">
// 										{flexRender(cell.column.columnDef.cell, cell.getContext())}
// 									</div>

// 									{isEditable && (
// 										<div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
// 											<SuggestEditSheet
// 												citation={cell.row.original}
// 												field={fieldName}
// 											/>
// 										</div>
// 									)}

// 								</TableCell>

// 							);
// 						})}
// 					</TableRow>
// 				)
// 				)
// 			) : (
// 				<TableRow>
// 					<TableCell className="h-24 text-center">
// 						No results.
// 					</TableCell>
// 				</TableRow>
// 			)}
// 		</TableBody>
// 	);
// }



// function Sorter({ column }: { column: Column<any, unknown>; }) {



// 	return (
// 		<DropdownMenu>
// 			<DropdownMenuTrigger asChild>
// 				<div className="flex items-center justify-between w-full px-2 gap-2">
// 					<div className="flex-1 truncate">
// 						{column.columnDef.meta!.name}
// 					</div>
// 					<Button variant="ghost" className="h-10 w-10 p-0 ml-auto">
// 						<AdjustmentsVerticalIcon className="h-4 w-4" />
// 					</Button>
// 				</div>
// 			</DropdownMenuTrigger>
// 			<DropdownMenuContent className="w-56">
// 				<DropdownMenuLabel>Sorting</DropdownMenuLabel>
// 				<Button
// 					variant="ghost"
// 					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
// 					className="justify-between w-full"
// 				>
// 					Ascending
// 					<BarsArrowUpIcon className="w-4 h-4" />
// 				</Button>
// 				<Button
// 					variant="ghost"
// 					onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
// 					className="justify-between w-full"
// 				>
// 					Descending
// 					<BarsArrowDownIcon className="w-4 h-4" />
// 				</Button>
// 			</DropdownMenuContent>
// 		</DropdownMenu>);
// }


