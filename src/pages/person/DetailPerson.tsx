import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToolDetail } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { PersonService } from "../../shared/services/api/person/PersonService";

interface IFormData {
  email: string;
  cityId: number;
  nameComplete: string;
}
export const DetailPerson: React.FC = () => {
  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      PersonService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/person');
          } else {
            setName(result.nameComplete);
            formRef.current?.setData(result);
          }
        })
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    setIsLoading(true);

    if (id === 'new') {
      PersonService
        .create(data)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/person/detail/${result}`)
          }
        });
    } else {
      PersonService
        .updateById(Number(id), { id: Number(id), ...data })
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          }
        });
    }
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Realmente deseja apagar?')) {
      PersonService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/person');
          }
        });
    }
  }


  return (
    <LayoutBasePage
      title={id === 'new' ? 'Nova Pessoa' : name}
      toolBar={
        <ToolDetail
          textButtonNew='Nova'
          viewButtonSaveAndBack
          viewButtonNew={id !== 'new'}
          viewButtonDelete={id !== 'new'}

          onClickSave={() => formRef.current?.submitForm()}
          onClickSaveAndBack={() => formRef.current?.submitForm()}
          onClickBack={() => navigate('/person')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/person/detail/new')}
        />
      }
    >

      <Form ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading &&(
              <Grid>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2} >
                <VTextField
                  fullWidth
                  label="Nome Completo"
                  name='nameComplete'
                  disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="E-mail"
                  name='email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Cidade"
                  name='cityId'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>

        {/* {[1, 2, 3, 4].map((_, index) => (
          <Scope key={} path={`addrees[${index}]`}>
            <VTextField name='street' />
            <VTextField name='number' />
            <VTextField name='state' />
            <VTextField name='city' />
            <VTextField name='country' />
          </Scope>
        ))} */}

      </Form>

    </LayoutBasePage>

  );
};