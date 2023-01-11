import { HiSolidSearch } from "solid-icons/hi";

interface SearchInputProps {
  // add props here
  onChange: (
    e: Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => void;
}

function SearchInput(props: SearchInputProps) {
  return (
    <div class="relative">
      <input
        placeholder="Search"
        class="bg-white pl-10 pr-4 py-2.5 sm:py-2 rounded-md text-sm border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
        onChange={props.onChange}
      />
      <span class="absolute top-3 sm:top-2.5 left-3.5 text-gray-500">
        <HiSolidSearch size={18} />
      </span>
    </div>
  );
}

export default SearchInput;
