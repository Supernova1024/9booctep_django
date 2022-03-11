from django import template

register = template.Library()

@register.filter
def arrayindex(sequence, position):
    return sequence[position]