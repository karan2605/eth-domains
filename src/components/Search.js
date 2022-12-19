import { Button, TextInput } from "flowbite-react";

const Search = () => {
  return (
    <div class="w-full h-96 bg-gradient-to-r from-blue-600 to-fuchsia-600">
      <div class="flex flex-col items-center justify-center h-full gap-3">
        <h1 class="text-white text-6xl font-semibold p-6">
          Seek and buy available domain names
        </h1>
        <TextInput type="text" placeholder="Find your domain" size={"lg"}/>
        <Button
          gradientDuoTone="purpleToPink"
          size="xl"
          className="font-semibold text-4xl"
        >
          <span className="text-3xl">Buy It</span>
        </Button>
      </div>
    </div>
  );
};

export default Search;
