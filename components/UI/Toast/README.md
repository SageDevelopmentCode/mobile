# Toast Component

A reusable toast notification component with smooth animations and multiple styles.

## Features

- ✅ **Multiple Types**: Success, Error, Warning, Info
- ✅ **Customizable Position**: Top or Bottom
- ✅ **Smooth Animations**: Slide in/out animations
- ✅ **Auto-dismiss**: Configurable duration
- ✅ **Custom Icons**: Override default icons
- ✅ **Translucent Design**: Beautiful semi-transparent backgrounds

## Usage

### Basic Usage

```tsx
import { useToast } from "@/components/UI/Toast/Toast";

function MyComponent() {
  const { showToast, ToastComponent } = useToast();

  const handleSuccess = () => {
    showToast("Success! Action completed");
  };

  const handleError = () => {
    showToast("Error occurred", { type: "error" });
  };

  return (
    <View>
      <Button onPress={handleSuccess} title="Show Success" />
      <Button onPress={handleError} title="Show Error" />

      {/* Add the ToastComponent to your render */}
      <ToastComponent />
    </View>
  );
}
```

### Advanced Usage

```tsx
// Custom duration and position
showToast("Custom message", {
  type: "warning",
  duration: 3000,
  position: "top",
});

// Custom icon
showToast("Custom icon", {
  type: "info",
  icon: "star",
});
```

### Toast Types

- **success** (default): Green background with checkmark
- **error**: Red/pink background with close circle
- **warning**: Yellow background with warning icon
- **info**: Blue background with info icon

### Props

| Prop       | Type                                        | Default   | Description                            |
| ---------- | ------------------------------------------- | --------- | -------------------------------------- |
| `message`  | string                                      | -         | Toast message text                     |
| `type`     | 'success' \| 'error' \| 'warning' \| 'info' | 'success' | Toast type/style                       |
| `duration` | number                                      | 2000      | Auto-dismiss duration in ms            |
| `position` | 'top' \| 'bottom'                           | 'bottom'  | Toast position                         |
| `icon`     | string                                      | -         | Custom icon name (overrides type icon) |

## Implementation Examples

### Note Saving Success

```tsx
// In note.tsx
const { showToast, ToastComponent } = useToast();

const handleSaveNote = async () => {
  try {
    await createUserBookNote(noteData);
    showToast("Note saved successfully!");
    router.back();
  } catch (error) {
    showToast("Failed to save note", { type: "error" });
  }
};
```

### Verse Copy Success

```tsx
// In VerseActionsBottomSheet.tsx
const { showToast, ToastComponent } = useToast();

const handleCopy = async () => {
  await Clipboard.setStringAsync(verseText);
  showToast("Verse copied to clipboard");
};
```

### Highlight Success

```tsx
// For highlighting verses
showToast("Verse highlighted", {
  type: "success",
  duration: 1500,
});
```
