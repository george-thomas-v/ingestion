interface Tag {
  name: string;
  description?: string;
}

const ingestion: Tag = {
  name: 'Ingestion',
  description: 'Ingestion trigger',
};

export const tags = {
  ingestion
};
