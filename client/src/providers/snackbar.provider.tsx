import { ReactNode } from "react"
import { SnackbarProvider as SnackBar } from 'notistack';
export default function SnackbarProvider ({
    children
} : {
    children : ReactNode
}) {


    return (
        <SnackBar>
            {children}
        </SnackBar>
    )
}