export function showToast(): void {
  const toast = document.querySelector('.toast');
  toast.classList.add('show-toast');

  setTimeout(function () {
    toast.classList.remove('show-toast');
  }, 3000);
}