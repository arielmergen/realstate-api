# 🤝 Guía de Contribución - RealState API Template

¡Gracias por tu interés en contribuir al RealState API Template! 

## 🎯 **¿Cómo contribuir?**

### **Para Usuarios del Template**
Si usas este template y encuentras mejoras:

1. **Fork** este repositorio
2. **Crea** una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Haz** tus cambios
4. **Commit** con mensajes descriptivos: `git commit -m "feat: agregar nueva funcionalidad"`
5. **Push** a tu rama: `git push origin feature/nueva-funcionalidad`
6. **Abre** un Pull Request

### **Para Desarrolladores**
Si quieres contribuir al template base:

1. **Fork** el repositorio
2. **Clona** tu fork localmente
3. **Crea** una rama de desarrollo
4. **Haz** tus cambios
5. **Prueba** que todo funcione: `./setup-local.sh`
6. **Abre** un Pull Request

## 📋 **Tipos de Contribuciones**

### **🐛 Bug Reports**
- Usa el template de Issues de GitHub
- Incluye pasos para reproducir
- Especifica versión y entorno

### **✨ Feature Requests**
- Describe la funcionalidad
- Explica el caso de uso
- Considera la compatibilidad

### **📚 Documentación**
- Mejora la claridad
- Agrega ejemplos
- Corrige errores

### **🔧 Mejoras Técnicas**
- Optimizaciones de rendimiento
- Mejoras de seguridad
- Refactoring de código

## 🧪 **Proceso de Testing**

Antes de enviar un PR:

```bash
# 1. Limpiar entorno
docker-compose down -v

# 2. Probar instalación
./setup-local.sh

# 3. Verificar que la API funciona
curl http://localhost:3001/realstate

# 4. Verificar datos
docker-compose exec postgres psql -U realstate -d realstate_db -c "SELECT count(*) FROM \"User\";"
```

## 📝 **Estándares de Código**

### **Commits**
- Usa [Conventional Commits](https://conventionalcommits.org/)
- Ejemplos: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`

### **Código**
- Sigue las convenciones de NestJS
- Usa TypeScript estricto
- Documenta funciones complejas

### **Documentación**
- Actualiza README si es necesario
- Incluye ejemplos de uso
- Mantén consistencia

## 🚀 **Proceso de Review**

1. **Automático**: GitHub Actions ejecuta tests
2. **Manual**: Revisión de código por maintainers
3. **Aprobación**: Al menos 1 aprobación requerida
4. **Merge**: Solo maintainers pueden hacer merge

## ❓ **¿Preguntas?**

- **Issues**: Para bugs y feature requests
- **Discussions**: Para preguntas generales
- **Email**: [tu-email@ejemplo.com]

## 🙏 **Agradecimientos**

¡Gracias por hacer este template mejor para toda la comunidad!

---

**¿Listo para contribuir?** ¡Crea tu primer Pull Request! 🚀
