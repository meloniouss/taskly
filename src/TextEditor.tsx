import { Box, Button, ButtonGroup, useTheme } from '@mui/material'
import './TextEditor.css'
import React, { useContext, useEffect } from 'react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TaskList } from '@tiptap/extension-task-list';
import {useDebounce} from './debounce';
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from '@tiptap/react'
import { FormatBold, FormatItalic, StrikethroughS, FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatSize, FormatListBulleted, FormatListNumbered, Code, HorizontalRule, FormatQuote, Checklist, CheckBox } from '@mui/icons-material';
import { ColorModeContext, tokens } from './theme'



export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ], //todo : add CRUD functionality
    content: `
      test
    `,
    onUpdate: ({ editor }) => {
       const content = editor.getHTML();
       debouncedSave(content);
      },    
  })

  const debouncedSave = useDebounce((content: string) => {
    saveContentToBackend(content);
  }, 300);


  const saveContentToBackend = async (content: string) => {
    try {
      await fetch('/api/saveContent', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };
  if (!editor) {
    return null;
  }
 
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          padding: '8px',
          backgroundColor: '#f4f4f4',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '8px',
        }}
      >
      <div>
      {/* Bubble Menu */}
        <BubbleMenu
          editor={editor}
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
        >
        <ButtonGroup size="small" variant="outlined" sx={{backgroundColor: theme.palette.secondary.main}}>

          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant={editor.isActive('bold') ? 'contained' : 'outlined'}
          >
            <FormatBold/>
          </Button>

          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive('italic') ? 'contained' : 'outlined'}
          >
            <FormatItalic />
          </Button>

          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            variant={editor.isActive('strike') ? 'contained' : 'outlined'}
          >
            <StrikethroughS/>
          </Button>
          </ButtonGroup>
        </BubbleMenu>
        
        </div>
      
        <ButtonGroup size="small" variant="outlined" sx={{backgroundColor: theme.palette.secondary.main}}>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant={editor.isActive('bold') ? 'contained' : 'outlined'}
          >
            <FormatBold/>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive('italic') ? 'contained' : 'outlined'}
          >
            <FormatItalic />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            variant={editor.isActive('strike') ? 'contained' : 'outlined'}
          >
            
            <StrikethroughS/>
          </Button>
        </ButtonGroup>
        

        <ButtonGroup size="small" variant="outlined" sx={{backgroundColor: theme.palette.secondary.main}}>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            variant={editor.isActive('heading', { level: 1 }) ? 'contained' : 'outlined'}
            startIcon={<FormatSize />}
          >
            H1
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            variant={editor.isActive('heading', { level: 2 }) ? 'contained' : 'outlined'}
            startIcon={<FormatSize />}
          >

            H2
          </Button>
        </ButtonGroup>

        <ButtonGroup size="small" variant="outlined" sx={{backgroundColor: theme.palette.secondary.main}}>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            variant={editor.isActive('bulletList') ? 'contained' : 'outlined'}
          >
            <FormatListBulleted />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            variant={editor.isActive('orderedList') ? 'contained' : 'outlined'}
          >
           <FormatListNumbered />
          </Button>
        </ButtonGroup>

        <ButtonGroup size="small" variant="outlined" sx={{backgroundColor: theme.palette.secondary.main}}>
          <Button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            variant={editor.isActive('blockquote') ? 'contained' : 'outlined'}
          >
            <FormatQuote/>
          </Button>
          <Button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
           <HorizontalRule />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            variant={editor.isActive('codeBlock') ? 'contained' : 'outlined'}
          >
            <Code />
          </Button>
        </ButtonGroup>

        <ButtonGroup size="small" variant="outlined" sx={{backgroundColor: theme.palette.secondary.main}}>
          <Button onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          <FormatAlignLeft />
          </Button>
          <Button onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          <FormatAlignCenter />
          </Button>
          <Button onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          <FormatAlignRight />
          </Button>
        </ButtonGroup>
      </Box>

      <EditorContent
        editor={editor}
        style={{
          flex: 1,
          padding: '20px',
          outline: 'none',
          cursor: 'text',
        }}
      />
    </Box>
  );
};