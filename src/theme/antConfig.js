/** @type {import('antd').ThemeConfig} */

const BORDER_RADIUS = {
  borderRadius: 4,
  borderRadiusLG: 4,
  borderRadiusSM: 4,
  borderRadiusXS: 4,
};

const CONTROL_HEIGHTS = {
  controlHeight: 35,
  controlHeightLG: 50,
  controlHeightSM: 30,
  controlHeightXS: 20,
};

const theme = {
  token: {
    colorPrimary: "#1A73E2",
    colorSuccess: "#28B463",
    colorWarning: "#E48900",
    colorInfo: "#8850FF",
    colorError: "#DC0A34",
    colorTextBase: "#19181a",

    dangerColor: "#DC0A34",

    ...BORDER_RADIUS,
    ...CONTROL_HEIGHTS,
  },
  components: {
    Button: {},
    Card: {},
    Input: {
      padding: 10,
    },
    Popover: {},
    Table: {
      headerBg: "#fff",
    },
    Notification: {},
    Switch: {
      colorPrimary: "#1A73E2",
    },
    Menu: {
      darkItemBg: "transparent",
      darkPopupBg: "transparent",
    },
  },
};

export default theme;
