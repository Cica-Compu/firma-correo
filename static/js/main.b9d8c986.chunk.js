var M = function () {
  var e = k(),
    t = React.useState(W),
    a = t[0],
    c = t[1],
    i = !!a.logo && !!a.fullName && !!a.title && !!a.phone;

  React.useEffect(function () {
    c(W);
  }, []);

  var handleChange = function (e) {
    c(function (t) {
      return {
        ...t,
        [e.target.name]: e.target.value,
      };
    });
  };

  var handleCopy = function () {
    var signature = document.querySelector(".signature");
    var range = document.createRange();
    if (signature) range.selectNode(signature);
    var selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    try {
      var success = document.execCommand("copy");
      console.log(success ? "Success" : "Fail");
      c(function (prev) {
        return { ...prev, copied: true };
      });
    } catch (err) {
      console.log("Fail");
    }
  };

  var handleDownload = function () {
    var html = ReactDOMServer.renderToStaticMarkup(
      <T
        logo={a.logo}
        fullName={a.fullName}
        credentials={a.credentials}
        title={a.title}
        phone={a.phone}
        mobile={a.mobile}
        email={a.email}
      />
    );
    var nameParts = a.fullName.toLowerCase().split(" ");
    var l = nameParts[0].charAt(0);
    var r = nameParts[1];
    var blob = new Blob([html]);
    var url = URL.createObjectURL(blob);
    var aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", `${l}${r}.htm`);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.parentNode?.removeChild(aTag);
  };

  return (
    <Container>
      <img className={e.centeredImage} src="cica-logo-vertical.png" alt="cica-logo" />
      <Typography variant="h2" gutterBottom className={e.centeredText}>
        Generador de firmas CICA
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={e.paper}>
            <form className={e.root} noValidate autoComplete="off">
              <Box className={e.box}>
                <p>
                  Por favor, rellene el formulario con sus datos personales para completar el
                  formato de firma. Luego, haga clic en el botón copiar, o bien, descargue el
                  archivo HTML para ser colocado y pegado en su servicio de correo preferido.
                </p>
                <FormControl fullWidth>
                  <InputLabel className={e.inputLabel} required id="logo-select">
                    Seleccione el logo
                  </InputLabel>
                  <Select
                    className={e.select}
                    value={a.logo}
                    name="logo"
                    onChange={handleChange}
                  >
                    <MenuItem value="cica-logo-vertical.png">CICA Horizontal</MenuItem>
                    // <MenuItem value="cica-logo-arbol.png">CICA Logo</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                required
                label="Nombre completo"
                value={a.fullName}
                name="fullName"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Grado académico (siglas)"
                value={a.credentials}
                name="credentials"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                required
                label="Cargo o título"
                value={a.title}
                name="title"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                required
                label="Teléfono"
                placeholder="+506 2511-8200"
                value={a.phone}
                name="phone"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Celular"
                placeholder="+506 8888-8888"
                value={a.mobile}
                name="mobile"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Correo electrónico"
                placeholder="correo@ucr.ac.cr"
                value={a.email}
                name="email"
                onChange={handleChange}
              />
              <br />
              <Button
                disabled={JSON.stringify(a) === JSON.stringify(W)}
                onClick={() => c(W)}
                color="secondary"
              >
                Limpiar
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={e.paper}>
            {a.fullName ? (
              <>
                <T
                  logo={a.logo}
                  credentials={a.credentials}
                  fullName={a.fullName}
                  title={a.title}
                  phone={a.phone}
                  mobile={a.mobile}
                  email={a.email}
                />
                <br />
                <Button onClick={handleCopy} disabled={!i} endIcon={a.copied ? <CopiedIcon /> : <CopyIcon />}>
                  {a.copied ? "Copiado!" : "Copiar"}
                </Button>
                <Button onClick={handleDownload} disabled={!i} endIcon={<DownloadIcon />}>
                  Descargar archivo HTML
                </Button>
              </>
            ) : (
              <div>Por favor ingrese sus datos</div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
