from django.shortcuts import render


def main_view(request, pk=None, *args, **kwargs):
    return render(request, "index.html")
