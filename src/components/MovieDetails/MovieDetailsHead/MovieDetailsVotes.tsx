import { Group, Image, Text, useMantineTheme } from "@mantine/core";
import yellowStar from "../../../assets/icons/yellowStar.svg";
import { FC } from "react";
import { voteCountReduction } from "@/components/utils";

type MovieDetailsVotesProps = {
  vote_average: number;
  vote_count: number;
};

export const MovieDetailsVotes: FC<MovieDetailsVotesProps> = ({
  vote_average,
  vote_count,
}) => {
  const theme = useMantineTheme();
  return (
    <Group>
      <Image w={"24px"} src={yellowStar.src} />
      <Text fw="600" size="lg" c={theme.colors.gray[9]}>
        {vote_average?.toFixed(1)}
      </Text>
      <Text fw="400" size="lg" c={theme.colors.gray[6]}>
        {"("}
        {voteCountReduction(vote_count)}
        {")"}
      </Text>
    </Group>
  );
};
