import dayjs from "dayjs";

export function createEventStore() {
  return {
    title: "",
    description: "",
    image: "",
    location: "",
    dates: [],
    date: dayjs(),
    setTitle(value) {
      this.title = value;
    },
    setDescription(value) {
      this.description = value;
    },
    async setImage(value) {
      const formData = new FormData();
      formData.append("upload_preset", "c0vr7ift");
      formData.append("file", value);

      const rawResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dtdb5uhao/image/upload",
        {
          method: "POST",
          body: formData
        }
      );
      const { secure_url } = await rawResponse.json();
      this.image = secure_url;
    },
    setLocation(value) {
      this.location = value;
    },
    addDate(value) {
      if (!this.dates.includes(this.date)) this.dates = [value, ...this.dates];
    },
    removeDate(index) {
      this.dates.splice(index, 1);
    },
    clearForm() {
      this.title = "";
      this.description = "";
      this.image = "";
      this.date = dayjs();
      this.dates = [];
      this.location = "";
    },
    get eventInformation() {
      return {
        title: this.title,
        description: this.description,
        eventImage: this.image,
        dates: this.dates,
        location: this.location
      };
    },
    get isValid() {
      return (
        !!this.title &&
        !!this.description &&
        !!this.image &&
        !!this.location &&
        this.dates.length > 0
      );
    }
  };
}
