import { supabase } from "../../supabase";
import { useQuery } from "@tanstack/react-query";

export const useBlogList = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("blog_post").select("*");
        if (error) {
          throw new Error(error.message); // Rethrow for Tanstack Query to handle
        }
        return data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching exams:", error); // Log any other errors
        throw error; // Rethrow for Tanstack Query to handle
      }
    },
  });
};
