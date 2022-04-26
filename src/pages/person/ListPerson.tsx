import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { ToolList } from "../../shared/components"
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts"
import { IListPerson, PersonService } from "../../shared/services/api/person/PersonService";


export const ListPerson: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListPerson[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totCount, setTotCount] = useState(0);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    const page = useMemo(() => {
        return Number(searchParams.get('page') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PersonService.getAll(page, search)
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
    }, [search, page]);

    const handleDelete = (id: number) => {
        
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Realmente deseja apagar?')) {
            PersonService.deleteById(id)
            .then(result => {
                if (result instanceof Error) {
                    alert(result.message);                    
                } else{
                    setRows(oldRows => {
                        return[
                            ...oldRows.filter(oldRow => oldRow.id !== id),
                        ];
                    });
                    alert('Registro apagado com sucesso');
                }
            });
        }
    }

    return (
        <LayoutBasePage
            title='Listagem de Pessoas'
            toolBar={
                <ToolList
                    textButtonNew='Nova Pessoa'
                    viewInputSearch
                    textSearch={search}
                    alterTextSearch={text => setSearchParams({ search: text, page: '1'}, { replace: true })}
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
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton size="small" onClick={() => navigate(`/person/detail/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nameComplete}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totCount === 0 && !isLoading && (
                        <caption>{Environment.LIST_NULL}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant='indeterminate' />

                                </TableCell>
                            </TableRow>
                        )}
                        {(totCount > 0 && totCount > Environment.LIMIT_LINES) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        page={page}
                                        count={Math.ceil(totCount / Environment.LIMIT_LINES)}
                                        onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>

        </LayoutBasePage>
    )
}