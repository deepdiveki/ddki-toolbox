// // src/components/chat/ui/sidebar.tsx
// 'use client';
//
// import * as React from 'react';
//
// // A small helper to join class names
// function cn(...classes: (string | undefined | boolean)[]): string {
//   return classes.filter(Boolean).join(' ');
// }
//
// // Constants for widths (using Tailwind width classes)
// const SIDEBAR_WIDTH = 'w-64'; // Expanded sidebar width (~16rem)
// const SIDEBAR_WIDTH_COLLAPSED = 'w-16'; // Collapsed sidebar width (~4rem)
//
// // -- Sidebar Context & Hook --
// type SidebarContextType = {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };
//
// const SidebarContext = React.createContext<SidebarContextType | null>(null);
//
// /**
//  * Hook to access the sidebar context.
//  */
// function useSidebar() {
//   const context = React.useContext(SidebarContext);
//   if (!context) {
//     throw new Error('useSidebar must be used within a Sidebar provider.');
//   }
//   return context;
// }
//
// /**
//  * Internal provider to manage sidebar state.
//  * This provider is automatically applied by the <Sidebar> component.
//  */
// const SidebarInternalProvider: React.FC<{ defaultOpen?: boolean; children: React.ReactNode }> = ({
//   children,
//   defaultOpen = true,
// }) => {
//   const [open, setOpen] = React.useState(defaultOpen);
//   const value = React.useMemo(() => ({ open, setOpen }), [open]);
//   return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
// };
//
// /**
//  * Sidebar container that adjusts its width based on the open state.
//  * Wraps its children with the internal provider.
//  */
// const Sidebar = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement> & { defaultOpen?: boolean }
// >(({ children, className, defaultOpen, ...props }, ref) => {
//   return (
//     <SidebarInternalProvider defaultOpen={defaultOpen}>
//       <SidebarContainer ref={ref} className={className} {...props}>
//         {children}
//       </SidebarContainer>
//     </SidebarInternalProvider>
//   );
// });
// Sidebar.displayName = 'Sidebar';
//
// const SidebarContainer = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ children, className, ...props }, ref) => {
//   const { open } = useSidebar();
//   const widthClass = open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED;
//   return (
//     <div
//       ref={ref}
//       {...props}
//       className={cn(
//         'transition-all duration-200 ease-in-out bg-white dark:bg-gray-800 shadow-md flex flex-col border-r border-gray-200 dark:border-gray-700',
//         widthClass,
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// });
// SidebarContainer.displayName = 'SidebarContainer';
//
// /**
//  * SidebarHeader – a header area for your sidebar.
//  */
// const SidebarHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
//   children,
//   className,
//   ...props
// }) => (
//   <div
//     {...props}
//     className={cn('px-4 py-3 border-b border-gray-200 dark:border-gray-700', className)}
//   >
//     {children}
//   </div>
// );
//
// /**
//  * SidebarContent – a scrollable area for sidebar content.
//  */
// const SidebarContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
//   children,
//   className,
//   ...props
// }) => (
//   <div
//     {...props}
//     className={cn('flex-1 overflow-y-auto px-4 py-3 text-gray-800 dark:text-gray-100', className)}
//   >
//     {children}
//   </div>
// );
//
//
// /**
//  * SidebarMenu – a container for listing menu items.
//  */
// const SidebarMenu: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({
//   children,
//   className,
//   ...props
// }) => (
//   <ul {...props} className={cn('flex flex-col space-y-1 list-none p-0 m-0', className)}>
//     {children}
//   </ul>
// );
//
// const SidebarInset = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<'main'>
// >(({ className, ...props }, ref) => {
//   return (
//     <main
//       ref={ref}
//       className={cn(
//         'relative flex min-h-svh flex-1 flex-col bg-background',
//         'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
//         className,
//       )}
//       {...props}
//     />
//   );
// });
// SidebarInset.displayName = 'SidebarInset';
//
// const SidebarInput = React.forwardRef<
//   React.ElementRef<typeof Input>,
//   React.ComponentProps<typeof Input>
// >(({ className, ...props }, ref) => {
//   return (
//     <Input
//       ref={ref}
//       data-sidebar="input"
//       className={cn(
//         'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
//         className,
//       )}
//       {...props}
//     />
//   );
// });
// SidebarInput.displayName = 'SidebarInput';
//
// const SidebarProvider = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<'div'> & {
//     defaultOpen?: boolean;
//     open?: boolean;
//     onOpenChange?: (open: boolean) => void;
//   }
// >(
//   (
//     {
//       defaultOpen = true,
//       open: openProp,
//       onOpenChange: setOpenProp,
//       className,
//       style,
//       children,
//       ...props
//     },
//     ref,
//   ) => {
//
//
//     // This is the internal state of the sidebar.
//     // We use openProp and setOpenProp for control from outside the component.
//     const [_open, _setOpen] = React.useState(defaultOpen);
//     const open = openProp ?? _open;
//     const setOpen = React.useCallback(
//       (value: boolean | ((value: boolean) => boolean)) => {
//         const openState = typeof value === 'function' ? value(open) : value;
//         if (setOpenProp) {
//           setOpenProp(openState);
//         } else {
//           _setOpen(openState);
//         }
//
//         // This sets the cookie to keep the sidebar state.
//         document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
//       },
//       [setOpenProp, open],
//     );
//
//
//     // We add a state so that we can do data-state="expanded" or "collapsed".
//     // This makes it easier to style the sidebar with Tailwind classes.
//     const state = open ? 'expanded' : 'collapsed';
//
//     const contextValue = React.useMemo<SidebarContext>(
//       () => ({
//         state,
//         open,
//         setOpen,
//       }),
//       [
//         state,
//         open,
//         setOpen,
//       ],
//     );
//
//     return (
//       <SidebarContext.Provider value={contextValue}>
//
//       </SidebarContext.Provider>
//     );
//   },
// );
// SidebarProvider.displayName = 'SidebarProvider';
//
//
//
// export {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarInset,
//   SidebarMenu,
//   useSidebar,
//   SidebarProvider,
// };