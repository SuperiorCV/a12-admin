<template>
  <div id="richEditor">
    <el-upload
      style="display: none"
      class="quill-picture-uploader"
      ref="quilEditorUploader"
      action="a"
      :before-upload="bfUpload"
      with-credentials
    >
    </el-upload>
    <quill-editor
      class="editor"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @change="onEditorChange($event)"
    />
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import hljs from "highlight.js";
// highlight.js style
import "highlight.js/styles/github-dark.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "RichEditor",
  components: {
    quillEditor,
  },
  mounted() {
    this.quilEditorUploader = this.$refs.quilEditorUploader;
  },
  data() {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
    ];
    return {
      quilEditorUploader: null,
      content: "", // 富文本里的内容
      editorOption: {
        // 富文本编辑器的工具栏
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                //替换原图片上传功能
                if (value) {
                  //   document
                  //     .querySelector(".quill-picture-uploader input")
                  this.quillEditor.click(); //核心
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
        placeholder: "请输入你的内容",
      },
    };
  },
  methods: {
    onEditorChange(e) {
      // console.log(this.content);
      const _this = this;
      _this.content = e.html; // 标签以<p></p> 形式渲染 （重点）
      _this.contentTxt = e.text.substr(0, 100);
    },
    bfUpload(file) {
      if ("image/png" == file.type || "image/jpeg" == file.type) {
      } else {
        this.$message.error("图片插入失败,请检查文件格式");
        return;
      }
    },
  },
};
</script>

<style scoped>
.editor {
  height: 100%;
  width: 100%;
}
.editor /deep/ .ql-container {
  font-size: 18px !important;
}
</style>