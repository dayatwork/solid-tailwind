import { Component, createEffect, createSignal, JSX } from "solid-js";
import { NumberInput, Select, TextInput } from "./components";

const DEFAULT_OPTIONS = [
  {
    value: "1",
    label: "Muhammad Muslim Syaifullah",
  },
  {
    value: "2",
    label: "Muhammad Hidayatullah",
  },
  {
    value: "3",
    label: "Muhammad Ilham",
  },
  {
    value: "4",
    label: "Muhammad Luthfi",
  },
  {
    value: "5",
    label: "Ulfathun Mawaddah",
  },
  {
    value: "6",
    label: "Zikra Siti Nabila",
  },
  {
    value: "7",
    label: "John",
  },
  {
    value: "8",
    label: "Jane",
  },
];

const App: Component = () => {
  const [error, setError] = createSignal("");
  const [selectedUser, setSelectedUser] = createSignal("");
  const [age, setAge] = createSignal(0);
  const [name, setName] = createSignal("");

  const [options, setOptions] = createSignal(DEFAULT_OPTIONS);

  const handleSelectUser = (v: string) => {
    setSelectedUser(v);
  };

  const handleChangeName = (v: string) => {
    setName(v);
  };

  createEffect(() => {
    console.log("Selected User", selectedUser());
  });

  const handleChangeAge = (v: number) => {
    setAge(v);
  };

  return (
    <div>
      <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
      <div class="max-w-xs mx-auto space-y-6">
        <p>Name: {name()}</p>
        <p>User: {selectedUser()}</p>
        <p>Age: {age()}</p>
        <TextInput
          label="Name"
          name="name"
          description="Your full name"
          required
          withRequiredLabel
          error={error()}
          value={name()}
          onChange={handleChangeName}
        />
        <Select
          name="user"
          label="Select User"
          options={options()}
          onChange={(v) => setSelectedUser(v.value)}
          value={selectedUser()}
          description="Pick your user"
        />
        <NumberInput
          label="Age"
          min={0}
          max={10}
          value={age()}
          onChange={handleChangeAge}
        />
      </div>
      {/* <button onClick={handleSetError}>Set Error</button> */}
    </div>
  );
};

export default App;
