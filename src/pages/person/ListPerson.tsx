import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { ToolList } from "../../shared/components"
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts"
import { IListPerson, PersonService } from "../../shared/services/api/person/PersonService";


export const ListPerson: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListPerson[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totCount, setTotCount] = useState(0);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PersonService.getAll(1, search)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        console.log(result);

                        setTotCount(result.totCount);
                        setRows(result.data);
                    }
                });
        });
    }, [search]);

    return (
        <LayoutBasePage
            title='Listagem de Pessoas'
            toolBar={
                <ToolList
                    textButtonNew='Nova Pessoa'
                    viewInputSearch
                    textSearch={search}
                    alterTextSearch={text => setSearchParams({ search: text }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>Ações</TableCell>
                                <TableCell>{row.nameComplete}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </LayoutBasePage>
    )
}