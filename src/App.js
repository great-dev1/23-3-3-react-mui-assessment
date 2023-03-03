import { useEffect, useState } from "react"
import {
  Container,
  Box,
  AppBar,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  Modal,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import mockData from "./mockData.js"
import "./App.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
  bgcolor: "background.paper",
  boxShadow: 24,
}

function App() {
  const [state, setState] = useState({})
  const [show, setShow] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (state.type) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${state.type}`)
        .then((res) => res.json())
        .then(result => setState((prev) => ({ ...prev, data: [result] })))
        .catch((err) => {
          console.error(err)
        })
    } else {
      setState((prev) => ({ ...prev, data: [] }))
    }
  }, [state.type])

  return (
    <>
      {mockData.map((el, idx) => (
        <Box key={idx}>
          {el["item-type"] === "header" && (
            <AppBar
              id={el.id}
              position="static"
              sx={{ padding: 1, textAlign: el.textAlign }}
            >
              <Typography variant={el.size === "medium" ? "h4" : "h5"}>
                {el.content}
              </Typography>
              <Typography variant={el.size === "medium" ? "h5" : "h6"}>
                {el.subheader}
              </Typography>
            </AppBar>
          )}

          {el["item-type"] === "form" && (
            <Container>
              <Box
                component="form"
                id={el.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  py: 4
                }}
                noValidate
                autoComplete="off"
              >
                {el.children.map((element, idx) => (
                  <Box key={idx}>
                    {element["item-type"] === "input" && (
                      <TextField
                        name={element.id}
                        value={state[element.id] || ""}
                        onChange={handleChange}
                        label={element.label}
                        required={element["other-required"]}
                        fullWidth={element.fluid}
                      />
                    )}

                    {element["item-type"] === "formgroup" && (
                      <Box
                        id={element.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        {element.children.map((item, idx) => (
                          <TextField
                            key={idx}
                            name={item.id}
                            value={state[item.id] || ""}
                            onChange={handleChange}
                            sx={{ flexGrow: element.widths === "equal" && 1 }}
                            label={item.label}
                            fullWidth={element.fluid}
                          />
                        ))}
                      </Box>
                    )}

                    {element["item-type"] === "dropdown" && (
                      <FormControl fullWidth={element.fluid}>
                        <InputLabel id="selectLabel">Type</InputLabel>
                        <Select
                          labelId="selectLabel"
                          name={element.id}
                          value={state[element.id] || ""}
                          onChange={handleChange}
                          label={element.label}
                        >
                          {element["data-elements"].map((ele, idx) => (
                            <MenuItem key={idx} value={ele.value}>{ele.text}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    {element["item-type"] === "textarea" && (
                      <FormControl fullWidth={element.fluid}>
                        <textarea
                          name={element.id}
                          value={state[element.id] || ""}
                          onChange={handleChange}
                          label={element.label}
                          rows={element.rows}
                          placeholder={element.label}
                        >
                        </textarea>
                      </FormControl>
                    )}
                  </Box>
                ))}
              </Box>
            </Container>
          )}

          {el["item-type"] === "gridview" && (
            <Container>
              <Box sx={{ height: 400 }}>
                <DataGrid
                  id={el.id}
                  rows={state.data || []}
                  columns={el.columns.map((column) => ({
                    field: column.id,
                    headername: column.name,
                    sortable: column.sortable,
                    filterable: column.filterable,
                    resizable: column.resizable,
                    flex: column.id === "title" && 1,
                    width: column.id !== "title" && 200,
                  }))}
                />
              </Box>
            </Container>
          )}

          {el["item-type"] === "button" && (
            <Container>
              <Button variant="contained" color={el.primary && "primary"} sx={{ my: 2 }} onClick={() => setShow(true)}>{el.content}</Button>
              <Modal
                open={show}
                onClose={() => setShow(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">States</Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2, wordWrap: "break-word" }}>
                    {JSON.stringify(state)}
                  </Typography>
                </Box>
              </Modal>
            </Container>
          )}
        </Box>
      ))}

    </>
  )
}

export default App
