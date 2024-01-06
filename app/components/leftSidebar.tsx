"use client";
import React, { useEffect, useState } from "react";
import Divider from "./divider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { createClient } from "@/utils/supabase/client";

export default function LeftSidebar() {
  const supabase = createClient();

  const [displaySidebar, setDisplaySidebar] = useState<Boolean>(false);
  const [genre, setGenre] = useState("");
  const [focus, setFocus] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [focuses, setFocuses] = useState<string[]>([]);

  useEffect(() => {
    const initializeTaskSettingsValues = async () => {
      const { data: genresData, error: genresError } = await supabase
        .from("genres")
        .select();
      const { data: focusesData, error: focusesError } = await supabase
        .from("focuses")
        .select();
      if (
        genresData &&
        focusesData &&
        genresData.length > 0 &&
        focusesData.length > 0
      ) {
        setGenres(
          genresData.map((genre) => {
            return genre.genre;
          })
        );
        setFocuses(
          focusesData.map((focus) => {
            return focus.focus;
          })
        );
      } else {
        console.error("No task settings have been configured.");
      }
    };

    const initializeUserTaskSettings = async () => {
      const { data, error: selectUserSettingsError } = await supabase
        .from("user_settings")
        .select("genre, focus");
      if (selectUserSettingsError) console.error(selectUserSettingsError);

      if (data && data.length > 0) {
        const userSettings = data[0];
        setGenre(userSettings.genre ?? "");
        setFocus(userSettings.focus ?? "");
      } else {
        const { data, error: insertUserSettingsError } = await supabase
          .from("user_settings")
          .insert({ genre: "fantasy", focus: "imagery" });
        if (insertUserSettingsError) console.error(insertUserSettingsError);
      }
    };

    initializeTaskSettingsValues();
    initializeUserTaskSettings();
  }, []);

  function toggleSidebar() {
    setDisplaySidebar(!displaySidebar);
  }

  async function updateGenre(updatedGenre: string) {
    const { data: userData } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("user_settings")
      .update({ genre: updateGenre })
      .eq("user_id", userData.user?.id)
      .select();
  }

  return (
    <div className="flex flex-col gap-4 mr-32">
      <button
        onClick={toggleSidebar}
        className="border rounded-sm p-1.5 mr-auto text-slate-400"
      >
        {displaySidebar ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </button>
      {displaySidebar && (
        // Render pre computed values for genre and focus
        <>
          {" "}
          <div className="grid gap-1">
            <label htmlFor="select-dropdown" className="font-semibold">
              Genre
            </label>
            <select
              id="genre-dropdown"
              className="border p-1.5"
              value={genre} // Set the selected value based on user settings
              onChange={(e) => updateGenre(e.target.value)}
            >
              {/* Map over genres and create dropdown options */}
              {genres.map((genreOption) => (
                <option key={genreOption} value={genreOption}>
                  {genreOption}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <label htmlFor="select-dropdown" className="font-semibold">
              Focus
            </label>
            <select
              id="focus-dropdown"
              className="border p-1.5"
              value={focus} // Set the selected value based on user settings
              onChange={(e) => setFocus(e.target.value)}
            >
              {/* Map over focuses and create dropdown options */}
              {focuses.map((focusOption) => (
                <option key={focusOption} value={focusOption}>
                  {focusOption}
                </option>
              ))}
            </select>
          </div>
          <Divider />
        </>
      )}
    </div>
  );
}
