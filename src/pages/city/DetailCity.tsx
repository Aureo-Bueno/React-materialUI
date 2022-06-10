import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import { ToolDetail } from "../../shared/components";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { VScope } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";

interface IFormData {
  name: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const DetailCity: React.FC = () => {
  const {formRef, save, saveAndClose, isSaveAndClose} = useVForm();

  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      CitiesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/city');
          } else {
            setName(result.name);
            formRef.current?.setData(result);
          }
        })
    }else{
      formRef.current?.setData({
        name: '',
      })
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema.
      validate(data, {abortEarly: false})
      .then((dataValidate) => {
        setIsLoading(true);

        if (id === 'new') {
          CitiesService
            .create(dataValidate)
            .then((result) => {
              setIsLoading(false);
    
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/city');
                } else {
                  navigate(`/city/detail/${result}`);
                }
              }
            });
        } else {
          CitiesService
            .updateById(Number(id), { id: Number(id), ...dataValidate })
            .then((result) => {
              setIsLoading(false);
    
              if (result instanceof Error) {
                alert(result.message);
              }else{
                if (isSaveAndClose()) {
                  navigate('/city');
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
      CitiesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/city');
          }
        });
    }
  }


  return (
    <LayoutBasePage
      title={id === 'new' ? 'Nova Cidade' : name}
      toolBar={
        <ToolDetail
          textButtonNew='Nova'
          viewButtonSaveAndBack
          viewButtonNew={id !== 'new'}
          viewButtonDelete={id !== 'new'}

          onClickSave={save}
          onClickSaveAndBack={saveAndClose}
          onClickBack={() => navigate('/city')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/city/detail/new')}
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
                  label="Nome"
                  name='name'
                  disabled={isLoading}
                  onChange={e => setName(e.target.value)}
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