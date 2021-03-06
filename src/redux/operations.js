import axios from "axios";

import {
  addContactError,
  addContactRequest,
  addContactSuccess,
  fecthContactsError,
  fecthContactsRequest,
  fecthContactsSuccess,
  removeContactError,
  removeContactRequest,
  removeContactSuccess,
} from "./actions";

axios.defaults.baseURL = "http://localhost:3004";

const fecthContacts = () => async (dispatch) => {
  dispatch(fecthContactsRequest());
  try {
    const { data } = await axios.get("/contacts");
    console.log(data);
    dispatch(fecthContactsSuccess(data));
  } catch (error) {
    dispatch(fecthContactsError(error));
  }
};

const addContact = ({ name, number }) => async (dispatch) => {
  const contact = {
    name,
    number,
  };

  console.log(contact);

  dispatch(addContactRequest());
  try {
    const { data } = await axios.post("/contacts", contact);
    console.log(data);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }
};

const removeContact = (id) => async (dispatch) => {
  dispatch(removeContactRequest());
  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(removeContactSuccess(id));
  } catch (error) {
    dispatch(removeContactError(error));
  }
};

export { fecthContacts, removeContact, addContact };
