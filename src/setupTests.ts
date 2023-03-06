import "@testing-library/jest-dom";
import "jest-styled-components";

import fetchMock from "jest-mock-fetch";

global.fetch = fetchMock as any;
