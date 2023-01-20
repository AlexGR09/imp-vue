<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Contactos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#0b9185" dark class="mb-2" v-bind="attrs" v-on="on">
              Agregar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.last_name"
                      label="Apellidos"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Teléfono"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.date_birth"
                      label="Fecha de Nacimiento"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field
                      v-model="editedItem.address"
                      label="Dirección"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#1ab188" text @click="close"> Cancelar </v-btn>
              <v-btn color="#1ab188" text @click="save"> Aceptar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >¿Desea borrar el registro?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#1ab188" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="#1ab188" text @click="deleteItemConfirm"
                >Aceptar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
    <template v-slot:item.fullName="{ item }">{{ item.fullName }}</template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nombre",
        align: "left",
        value: "name",
      },
      {
        text: "Apellido",
        align: "left",
        value: "last_name",
      },
      {
        text: "Teléfono",
        align: "left",
        value: "phone",
      },
      {
        text: "Fecha de nacimiento",
        align: "left",
        value: "date_birth",
      },
      {
        text: "Fecha de nacimiento",
        align: "left",
        value: "address",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      last_name: "",
      phone: "",
      date_birth: "",
      address: "",
    },
    defaultItem: {
      name: "",
      last_name: "",
      phone: "",
      date_birth: "",
      address: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregar Contacto" : "Editar Contacto";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$axios
        .get("/api/contacts", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.items = this.items.map((item) => {
        item.fullName = item.name + " " + item.last_name;
        return item;
      });
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$axios
        .delete("api/contacts/" + this.editedItem.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.items.splice(this.editedIndex, 1);
          this.initialize();
          this.closeDelete();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.$axios
          .put("api/contacts/" + this.editedItem.id, this.editedItem, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.initialize();
            this.close();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$axios
          .post("api/contacts/", this.editedItem, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log(response.data.data);
            this.initialize();
            this.close();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}
</style>