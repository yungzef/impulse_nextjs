let dialogRef: HTMLDialogElement | null = null;

export function useSubscriptionDialog() {
    return {
        openSubscriptionDialog: () => dialogRef?.showModal(),
        setSubscriptionDialogRef: (ref: HTMLDialogElement | null) => {
            dialogRef = ref;
        },
    };
}
