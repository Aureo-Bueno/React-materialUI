import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ToolList } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";
import { PersonService } from "../../shared/services/api/person/PersonService";


export const Dashboard = () => {

    const [isLoadingCity, setIsLoadingCity] = useState(true);
    const [isLoadingPerson, setIsLoadingPerson] = useState(true);
    const [totCountCity, setTotCountCity] = useState(0);
    const [totCountPerson, setTotCountPerson] = useState(0);

    useEffect(() => {
      setIsLoadingCity(true);
      setIsLoadingPerson(true);

        CitiesService.getAll(1)
            .then((result) => {
                setIsLoadingCity(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTotCountCity(result.totCount);
                }
      });

      PersonService.getAll(1)
            .then((result) => {
                setIsLoadingPerson(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTotCountPerson(result.totCount);
                }
      });
    }, []);

    return(
        <LayoutBasePage 
          title='Página Inicial' 
          toolBar={<ToolList viewButtonNew={false} />}
        >
        <Box width='100%' display='flex'>
            <Grid container margin={4}>
                <Grid item container spacing={2}>
                   
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <Card>
                            <CardContent>
                               <Typography variant='h3' align='center'>Total de Pessoas</Typography>
                               
                               <Box padding={6} display='flex' justifyContent='center' alignContent='center' alignItems='center'>
                                 {!isLoadingPerson &&(
                                        <Typography variant='h1'>
                                           {totCountPerson}
                                        </Typography> 
                                 )}
                                 
                                 {isLoadingPerson && (
                                    <Typography variant='h5'>
                                       Carregando...
                                    </Typography>
                                 )}
                               </Box> 
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <Card>
                            <CardContent>
                               <Typography variant='h3' align='center'>Total de Cidades</Typography>
                               
                               <Box padding={6} display='flex' justifyContent='center' alignContent='center' alignItems='center'>
                                 {!isLoadingCity &&(
                                    <Typography variant='h1'>
                                      {totCountCity}
                                    </Typography> 
                                 )}
                                 
                                 {isLoadingCity && (
                                    <Typography variant='h5'>
                                       Carregando...
                                    </Typography>
                                 )}
                                
                               </Box> 
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        </LayoutBasePage>
    );
};