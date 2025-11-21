import { supabase } from "@/utils/supabase";

type PageRow = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

export default async function Page() {
  // 서버 사이드에서 데이터 가져오기
  const { data, error } = await supabase
    .from<PageRow>("page")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching page data:", error);
  }

  return (
    <div>
      <h1>Pages</h1>
      <ul>
        {data?.map((row) => (
          <li key={row.id}>
            <h3>{row.title}</h3>
            <p>{row.body}</p>
            <small>{new Date(row.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
