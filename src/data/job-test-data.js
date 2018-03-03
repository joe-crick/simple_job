import faker from "faker";
import _ from "lodash";

export const jobData = num =>
  _.times(num, id => {
    return {
      id,
      companyName: faker.company.companyName(),
      companyLogo: faker.image.imageUrl(),
      datePosted: faker.date.future().toLocaleDateString(),
      description: faker.lorem.sentence()
    };
  });
