import { API_BASE_URL, API_ROUTES } from "@/constants/app";

import { Group, Image, Stack, Title } from "@mantine/core";

import noIcon from "@/assets/icons/noCompanyIcon.svg";

import { FC } from "react";

type MovieProductionProps = {
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    },
  ];
};

export const MovieProduction: FC<MovieProductionProps> = ({
  production_companies,
}) => {
  return (
    <div>
      <Title order={4} mb={"md"}>
        Production
      </Title>
      <Stack gap={"sm"}>
        {production_companies.map((item) => (
          <Group key={item.id}>
            <Image
              w={40}
              mah={40}
              alt={item.name}
              src={
                item.logo_path
                  ? `${API_BASE_URL}${API_ROUTES.LOGOS}${item.logo_path}`
                  : noIcon.src
              }
            />
            <Title order={5}>{item.name}</Title>
          </Group>
        ))}
      </Stack>
    </div>
  );
};
