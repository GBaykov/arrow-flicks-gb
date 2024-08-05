import { MovieVideo } from "@/redux/appTypes";
import { Divider, Group, Title } from "@mantine/core";

import { FC } from "react";

type MovieTrailerProps = {
  trailers: MovieVideo[];
};

export const MovieTrailer: FC<MovieTrailerProps> = ({ trailers }) => {
  const oficialTrailer: MovieVideo | null =
    trailers.filter((item) => item.type === "Trailer")[0] || null;
  return (
    <div>
      <Title order={4} pb={"md"}>
        Trailer
      </Title>
      <Group
        h={{ base: "151px", sm: "281px" }}
        w={{ base: "270px", sm: "500px" }}
      >
        {" "}
        <iframe
          width={"100%"}
          height={"100%"}
          title="Youtube player"
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
          src={`https://youtube.com/embed/${oficialTrailer?.key}?autoplay=0`}
        ></iframe>
      </Group>
      <Divider my="xs" mb={"20px"} mt={"20px"} />
    </div>
  );
};
