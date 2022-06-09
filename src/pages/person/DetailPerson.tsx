import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import { ToolDetail } from "../../shared/components";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { VScope } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { PersonService } from "../../shared/services/api/person/PersonService";

interface IFormData {
  email: string;
  cityId: number;
  nameComplete: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  email: yup.string().required().email(),
  cityId: yup.number().required(),
  nameComplete: yup.string().required('Campo e obrigatorio.').min(3,'O campo precisa ter pelo menos 3 caracteres.'),
});

export const DetailPerson: React.FC = () => {
  const {formRef, save, saveAndClose, isSaveAndClose} = useVForm();

  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate();


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
    }else{
      formRef.current?.setData({
        nameComplete: '',
        email: '',
        cityId: '',
      })
    }
  }, [id]);

  const handleSave = (data: IFormData) => {

    formValidationSchema.
      validate(data, {abortEarly: false})
      .then((dataValidate) => {
        setIsLoading(true);

        if (id === 'new') {
          PersonService
            .create(dataValidate)
            .then((result) => {
              setIsLoading(false);
    
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/person');
                } else {
                  navigate(`/person/detail/${result}`);
                }
              }
            });
        } else {
          PersonService
            .updateById(Number(id), { id: Number(id), ...dataValidate })
            .then((result) => {
              setIsLoading(false);
    
              if (result instanceof Error) {
                alert(result.message);
              }else{
                if (isSaveAndClose()) {
                  navigate('/person');
                } 
              }
            });
        }

      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if(!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });


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

          onClickSave={save}
          onClickSaveAndBack={saveAndClose}
          onClickBack={() => navigate('/person')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/person/detail/new')}
        />
      }
    >

      <VForm ref={formRef} onSubmit={handleSave}>
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

      </VForm>

    </LayoutBasePage>

  );
};