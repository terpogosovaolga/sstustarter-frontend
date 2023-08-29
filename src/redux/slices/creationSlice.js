import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import serverURL from "../../serveraddress";

export const createProject = createAsyncThunk(
  "creation/createProject",
  async function (_, { rejectWithValue, dispatch, getState }) {
    try {
      let elems1 = getState().creation.elems1;
      let elems2 = getState().creation.elems2;
      let elems3 = getState().creation.elems3;
      let author_id = getState().auth.userId;

      let D = new Date();
      D.setMonth(D.getMonth() + 1);
      let date =
        D.getFullYear() +
        "-" +
        (D.getMonth() + 1 < 10 ? "0" + (D.getMonth() + 1) : D.getMonth() + 1) +
        "-" +
        (D.getDate() < 10 ? "0" + D.getDate() : D.getDate());
      axios
        .post(serverURL + "projects/create", {
          project: {
            name: elems1.name,
            theme_id: elems1.theme,
            author_id: author_id,
            idea_text: elems1.idea,
            about_author_text: elems2.aboutAuthor,
            // goals: elems2.goals,
            members_goal: elems3.membersCount,
            searching_for: elems3.searchingFor,
            color1: "",
            color2: "",
            color3: "",
            plandate_step_end: date,
            // main_photo: main_photo_url,
            // photos: photos_url,
          },
        })
        .then((response) => {
          if (response.data.success) {
            // сохраняем главную фотографию
            const id = response.data.project.id;
            const formData = new FormData();
            formData.append("image", elems2.image);
            axios.post(serverURL + "upload", formData).then((response) => {
              if (response.data.success) {
                let main_photo_url = response.data.url;
                axios
                  .post(serverURL + "projects/addphoto", {
                    project_id: id,
                    path: main_photo_url,
                    isMain: 1,
                  })
                  .then((res) => console.log(res.data));
              } else {
                console.log(response.data);
              }
            });

            // сохраняем фотографии целей
            for (let i = 0; i < elems2.goals.length; i++) {
              let image = elems2.goals[i].image;
              let text = elems2.goals[i].text;

              if (!image) {
                axios
                  .post(serverURL + "projects/addgoal", {
                    project_id: id,
                    photo_id: null,
                    text: text,
                    index: i + 1,
                  })
                  .then((res) => {
                    if (res.data.success) {
                      console.log(res.data);
                    } else {
                      console.log(res.data);
                    }
                  });
              } else {
                const formData2 = new FormData();
                formData2.append("image", image);
                axios.post(serverURL + "upload", formData2).then((response) => {
                  if (response.data.success) {
                    let url = response.data.url;
                    axios
                      .post(serverURL + "projects/addphoto", {
                        project_id: id,
                        path: url,
                        isMain: 0,
                      })
                      .then((res) => {
                        if (res.data.success) {
                          let photo_id = res.data.id;
                          axios
                            .post(serverURL + "projects/addgoal", {
                              project_id: id,
                              photo_id: photo_id,
                              text: text,
                              index: i + 1,
                            })
                            .then((res) => {
                              if (res.data.success) {
                                console.log(res.data);
                              } else {
                                console.log(res.data);
                              }
                            });
                        } else {
                          console.log(res.data);
                        }
                      });
                  } else {
                    console.log(response.data);
                  }
                });
              }
            }
          } else return "NOT OK";
        });

      let photos = elems2.goals.filter((g) => g.image).map((g) => g.image);

      let photos_url = [];
      let ready = photos.length == 0 ? true : false;
      for (const photo of photos) {
        const formData = new FormData();
        formData.append("image", photo);
        axios.post(serverURL + "upload", formData).then((response) => {
          if (response.data.success) {
            photos_url.push(response.data.url);
          }
        });
        ready = true;
      }
      // while (main_photo_url == "" || !ready) {
      //   console.log("ждем mp: ", main_photo_url, "r: ", ready);
      // }
      // console.log("преред запросом :" + main_photo_url);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProject = createAsyncThunk(
  "creation/getProject",
  async function (id, { rejectWithValue, dispatch, getState }) {
    try {
      axios.get(serverURL + "projects/" + id).then((response) => {
        if (response.data.success) {
          const project = response.data.project;
          console.log(project);
          dispatch(
            setElems1({
              name: project.name,
              theme: project.theme_id,
              idea: project.idea_text,

              namePat: "",
              themePat: "",
              ideaPat: "",
            })
          );

          let goals_ = project.goals;
          let pat = "";
          if (goals_.length < 3) {
            pat = "Напишите минимум 3 цели";
            while (goals_.length < 3) {
              goals_.push({
                id: null,
                text: "",
                path: null,
              });
            }
          }

          dispatch(
            setElems2({
              aboutAuthor: project.about_author_text,
              goals: goals_,
              path: project.main_photo.path,

              aboutAuthorPat: "",
              goalsPat: pat,
              imagePat: "",
            })
          );

          let searchs = project.searchingFor ? project.searchingFor : [];
          let pats = "";
          if (searchs.length == 0) {
            pats = "Заполните хотя бы один пункт";
            searchs.push("");
          }
          dispatch(
            setElems3({
              membersCount: project.members_goal,
              searchingFor: searchs,

              membersCountPat: "",
              searchingForPat: pats,
            })
          );

          dispatch(setAuthorId(project.author_id));
        } else {
          console.log(response.data);
        }
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "creation/updateProject",
  async function (id, { rejectWithValue, dispatch, getState }) {
    try {
      let elems1 = getState().creation.elems1;
      let elems2 = getState().creation.elems2;
      let elems3 = getState().creation.elems3;
      axios
        .post(serverURL + "proect/changeStatus", {
          project_id: id,
          status_id: 6,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  step: 1,
  action: "Создание",
  author_id: null,
  elems1: {
    name: "",
    theme: 0,
    idea: "",

    namePat: "Минимальная длина - 5 символов",
    themePat: "Выберите тему проекта",
    ideaPat:
      "Рекомендуемая длина - 100-500 символов. Минимальная - 50, максимальная - 1000",
  },
  elems2: {
    aboutAuthor: "",
    goals: [
      { text: "", image: null },
      { text: "", image: null },
      { text: "", image: null },
    ],
    image: null,

    aboutAuthorPat:
      "Рекомендуемая длина - 100-500 символов. Минимальная - 50, максимальная - 1000",
    goalsPat: "Напишите минимум 3 цели",
    imagePat: "Фото обязательно",
  },
  elems3: {
    membersCount: 0,
    searchingFor: [""],

    membersCountPat: "Напишите число участников",
    searchingForPat: "Заполните хотя бы один пункт",
  },
};

export const creationSlice = createSlice({
  name: "creation",
  initialState,
  reducers: {
    setStep(state, actions) {
      state.step = actions.payload;
    },
    setName(state, actions) {
      state.elems1.name = actions.payload;
    },
    setTheme(state, actions) {
      state.elems1.theme = actions.payload;
      console.log(state.theme);
    },
    setIdea(state, actions) {
      state.elems1.idea = actions.payload;
    },
    setNamePat(state, actions) {
      state.elems1.namePat = actions.payload;
    },
    setThemePat(state, actions) {
      state.elems1.themePat = actions.payload;
    },
    setIdeaPat(state, actions) {
      state.elems1.ideaPat = actions.payload;
    },
    setAuthorId(state, actions) {
      state.author_id = actions.payload;
    },
    setAboutAuthor(state, actions) {
      state.elems2.aboutAuthor = actions.payload;
    },
    setImage(state, actions) {
      state.elems2.image = actions.payload;
    },
    setImagePat(state, actions) {
      state.elems2.imagePat = actions.payload;
    },
    setAboutAuthorPat(state, actions) {
      state.elems2.aboutAuthorPat = actions.payload;
    },
    setGoals(state, actions) {
      state.elems2.goals = actions.payload;
    },
    setGoalByIndex(state, actions) {
      state.elems2.goals[actions.payload.index] = actions.payload;
    },
    setGoalsPat(state, actions) {
      state.elems2.goalsPat = actions.payload;
    },
    addEmptyGoal(state, actions) {
      state.elems2.goals.push({ text: "", image: null });
    },
    setAboutAuthor(state, actions) {
      state.elems2.aboutAuthor = actions.payload;
    },
    removeGoal(state, actions) {
      state.elems2.goals.splice(actions.payload, 1);
    },
    setGoal(state, actions) {
      state.elems2.goals[actions.payload.index] = actions.payload;
    },
    setAction(state, actions) {
      state.action = actions.payload;
    },
    setMembersCount(state, actions) {
      state.elems3.membersCount = actions.payload;
    },
    setMembersCountPat(state, actions) {
      state.elems3.membersCountPat = actions.payload;
    },
    setSearchingFor(state, actions) {
      state.elems3.searchingFor = actions.payload;
    },
    setSearchingForPat(state, actions) {
      state.elems3.searchingForPat = actions.payload;
    },
    setDateEnd(state, actions) {
      state.elems3.dateEnd = actions.payload;
    },
    setDateEndPat(state, actions) {
      state.elems3.dateEndPat = actions.payload;
    },
    removeSearchingFor(state, actions) {
      state.elems3.searchingFor.splice(actions.payload, 1);
    },
    setOneSearchingFor(state, actions) {
      state.elems3.searchingFor[actions.payload.index] = actions.payload.text;
    },
    addEmptySearchingFor(state, actions) {
      state.elems3.searchingFor.push("");
    },

    setElems1(state, actions) {
      state.elems1 = actions.payload;
    },
    setElems2(state, actions) {
      state.elems2 = actions.payload;
    },
    setElems3(state, actions) {
      state.elems3 = actions.payload;
    },
  },
  extraReducers: {
    [createProject.pending]: (state) => {
      console.log("extraReducers createProject pending");
    },
    [createProject.fulfilled]: (state, action) => {
      console.log("createProject ready");
    },
    [createProject.rejected]: (state, action) => {
      console.log("error");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStep,
  setName,
  setTheme,
  setIdea,
  setNamePat,
  setThemePat,
  setIdeaPat,
  setGoals,
  setGoalByIndex,
  setGoalsPat,
  setAboutAuthor,
  setAboutAuthorPat,
  setImage,
  setImagePat,
  addEmptyGoal,
  removeGoal,
  setGoal,
  setMembersCount,
  setMembersCountPat,
  setDateEnd,
  setDateEndPat,
  setSearchingFor,
  setSearchingForPat,
  removeSearchingFor,
  addEmptySearchingFor,
  setOneSearchingFor,
  setAction,
  setElems1,
  setElems2,
  setElems3,
  setAuthorId,
} = creationSlice.actions;

export default creationSlice.reducer;
